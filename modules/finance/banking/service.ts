import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { accountingService } from "../accounting/service";
import { createAuditEvent } from "./audit";
import { events } from "./events";
import { permissions } from "./permissions";
import { bankingRepository } from "./repository";
import {
  bankAccountCreateSchema, bankAccountListSchema, bankAccountUpdateSchema, bankReconciliationCreateSchema, bankReconciliationListSchema,
  bankReconciliationUpdateSchema, cancelReconciliationSchema, cashBankLedgerQuerySchema, completeReconciliationSchema, matchStatementLineSchema,
  reconciliationLineInputSchema,
} from "./schemas";
import type {
  BankReconciliationLineInput, BankReconciliationLineRecord, BankReconciliationRecord, BankingContext, BankingRepository,
  CashBankLedgerRequest, ReconciliationTotals,
} from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => { if (!decision.allowed) throw new Error(decision.reasons.join("; ")); };
const assertPermission = (context: BankingContext, permission: string, record?: unknown) => assertAllowed(evaluatePolicy({ actor: context, permission, record: record as never }));
const assertFound = <T>(record: T | undefined, label: string) => { if (!record) throw new Error(`${label} was not found`); return record; };
const roundMoney = (value: number) => Math.round((value + Number.EPSILON) * 100) / 100;

function assertDraft(reconciliation: BankReconciliationRecord) {
  if (reconciliation.status !== "DRAFT") throw new Error("Only DRAFT reconciliations can be changed");
}
function lineAmount(line: { debitAmount?: number; creditAmount?: number }) {
  return roundMoney((line.debitAmount ?? 0) - (line.creditAmount ?? 0));
}
function buildLines(input: BankReconciliationLineInput[], reconciliationId = "") {
  return input.map((line, index) => {
    const parsed = reconciliationLineInputSchema.parse(line);
    const now = new Date().toISOString();
    return {
      id: crypto.randomUUID(),
      reconciliationId,
      transactionDate: parsed.transactionDate,
      description: parsed.description,
      referenceNumber: parsed.referenceNumber,
      debitAmount: parsed.debitAmount,
      creditAmount: parsed.creditAmount,
      amount: lineAmount(parsed),
      createdAt: now,
      updatedAt: now,
    } satisfies BankReconciliationLineRecord;
  });
}

export function createBankingService(repository: BankingRepository = bankingRepository, accounting: typeof accountingService = accountingService) {
  async function assertCashBankFinanceAccount(tenantId: string, accountId: string, context: BankingContext) {
    const account = await accounting.getAccountById(tenantId, accountId, context);
    if (!account.isActive) throw new Error("Linked finance account must be active");
    if (!account.isCashAccount && !account.isBankAccount) throw new Error("Linked finance account must be a cash or bank account");
    return account;
  }
  async function initialTotals(input: { tenantId: string; bankAccountId: string; statementStartDate: string; statementEndDate: string; closingStatementBalance: number }, lines: BankReconciliationLineRecord[]): Promise<ReconciliationTotals> {
    const summary = await repository.getCashBankSummary({ tenantId: input.tenantId, bankAccountId: input.bankAccountId, dateTo: input.statementEndDate, page: 1, pageSize: 100000 });
    const matchedAmount = roundMoney(lines.filter((line) => line.matchedJournalEntryLineId).reduce((sum, line) => sum + Math.abs(line.amount), 0));
    const unmatchedStatementAmount = roundMoney(lines.filter((line) => !line.matchedJournalEntryLineId).reduce((sum, line) => sum + Math.abs(line.amount), 0));
    return {
      systemOpeningBalance: summary.openingBalance,
      systemClosingBalance: summary.closingBalance,
      matchedAmount,
      unmatchedStatementAmount,
      differenceAmount: roundMoney(input.closingStatementBalance - summary.closingBalance),
    };
  }
  async function refreshTotals(tenantId: string, id: string) {
    const totals = assertFound(await repository.calculateReconciliationTotals(tenantId, id), "Reconciliation totals");
    const current = assertFound(await repository.getBankReconciliationById(tenantId, id), "Bank reconciliation");
    await repository.updateDraftBankReconciliation(tenantId, id, {}, undefined, totals);
    return totals;
  }

  return {
    async createBankAccount(input: unknown, context: BankingContext) {
      assertPermission(context, permissions.bankAccountsCreate);
      const parsed = bankAccountCreateSchema.parse(input);
      await assertCashBankFinanceAccount(parsed.tenantId, parsed.accountId, context);
      const account = await repository.createBankAccount(parsed);
      createAuditEvent(events.bankAccountCreated, context.actorId, account.id);
      return account;
    },
    async listBankAccounts(input: unknown, context: BankingContext) {
      assertPermission(context, permissions.bankAccountsView);
      return repository.listBankAccounts(bankAccountListSchema.parse(input));
    },
    async getBankAccountById(tenantId: string, id: string, context: BankingContext) {
      const account = assertFound(await repository.getBankAccountById(tenantId, id), "Bank account");
      assertPermission(context, permissions.bankAccountsView, account);
      return account;
    },
    async updateBankAccount(tenantId: string, id: string, input: unknown, context: BankingContext) {
      const current = assertFound(await repository.getBankAccountById(tenantId, id), "Bank account");
      assertPermission(context, permissions.bankAccountsUpdate, current);
      const parsed = bankAccountUpdateSchema.parse(input);
      const updated = assertFound(await repository.updateBankAccount(tenantId, id, parsed), "Bank account");
      createAuditEvent(events.bankAccountUpdated, context.actorId, updated.id);
      return updated;
    },
    async softDeleteBankAccount(tenantId: string, id: string, context: BankingContext) {
      const current = assertFound(await repository.getBankAccountById(tenantId, id), "Bank account");
      assertPermission(context, permissions.bankAccountsDelete, current);
      const deleted = assertFound(await repository.softDeleteBankAccount(tenantId, id), "Bank account");
      createAuditEvent(events.bankAccountDeleted, context.actorId, deleted.id);
      return deleted;
    },
    async setDefaultBankAccount(tenantId: string, id: string, context: BankingContext) {
      const current = assertFound(await repository.getBankAccountById(tenantId, id), "Bank account");
      assertPermission(context, permissions.bankAccountsUpdate, current);
      if (current.status !== "ACTIVE") throw new Error("Only ACTIVE bank accounts can be default");
      const updated = assertFound(await repository.setDefaultBankAccount(tenantId, id), "Bank account");
      createAuditEvent(events.bankAccountDefaultSet, context.actorId, updated.id);
      return updated;
    },
    async getCashBankLedger(input: unknown, context: BankingContext) {
      assertPermission(context, permissions.cashBankLedgerView);
      return repository.getCashBankLedger(cashBankLedgerQuerySchema.parse(input));
    },
    async getCashBankSummary(input: unknown, context: BankingContext) {
      assertPermission(context, permissions.cashBankLedgerView);
      return repository.getCashBankSummary(cashBankLedgerQuerySchema.parse(input));
    },
    async getBankAccountLedger(tenantId: string, bankAccountId: string, input: unknown, context: BankingContext) {
      await this.getBankAccountById(tenantId, bankAccountId, context);
      return this.getCashBankLedger({ ...(input as CashBankLedgerRequest), tenantId, bankAccountId }, context);
    },
    async getUnreconciledJournalLines(tenantId: string, bankAccountId: string, input: unknown, context: BankingContext) {
      await this.getBankAccountById(tenantId, bankAccountId, context);
      assertPermission(context, permissions.cashBankLedgerView);
      return repository.getUnreconciledJournalLines(cashBankLedgerQuerySchema.extend({ bankAccountId: cashBankLedgerQuerySchema.shape.bankAccountId.unwrap() }).parse({ ...(input as Record<string, unknown>), tenantId, bankAccountId }));
    },
    async createBankReconciliation(input: unknown, context: BankingContext) {
      assertPermission(context, permissions.reconciliationCreate);
      const parsed = bankReconciliationCreateSchema.parse(input);
      const bankAccount = assertFound(await repository.getBankAccountById(parsed.tenantId, parsed.bankAccountId), "Bank account");
      if (bankAccount.status !== "ACTIVE") throw new Error("Reconciliation requires an ACTIVE bank account");
      const lines = buildLines(parsed.lines ?? []);
      const totals = await initialTotals(parsed, lines);
      const reconciliation = await repository.createBankReconciliation(parsed, lines, totals);
      createAuditEvent(events.reconciliationCreated, context.actorId, reconciliation.id);
      return reconciliation;
    },
    async listBankReconciliations(input: unknown, context: BankingContext) {
      assertPermission(context, permissions.reconciliationView);
      return repository.listBankReconciliations(bankReconciliationListSchema.parse(input));
    },
    async getBankReconciliationById(tenantId: string, id: string, context: BankingContext) {
      const record = assertFound(await repository.getBankReconciliationById(tenantId, id), "Bank reconciliation");
      assertPermission(context, permissions.reconciliationView, record);
      return record;
    },
    async updateDraftBankReconciliation(tenantId: string, id: string, input: unknown, context: BankingContext) {
      const current = await this.getBankReconciliationById(tenantId, id, context);
      assertDraft(current);
      assertPermission(context, permissions.reconciliationUpdate, current);
      const parsed = bankReconciliationUpdateSchema.parse(input);
      const lines = parsed.lines ? buildLines(parsed.lines, id) : undefined;
      const totals = parsed.closingStatementBalance || parsed.statementEndDate || lines ? await initialTotals({ tenantId, bankAccountId: current.bankAccountId, statementStartDate: parsed.statementStartDate ?? current.statementStartDate, statementEndDate: parsed.statementEndDate ?? current.statementEndDate, closingStatementBalance: parsed.closingStatementBalance ?? current.closingStatementBalance }, lines ?? current.lines) : undefined;
      const updated = assertFound(await repository.updateDraftBankReconciliation(tenantId, id, parsed, lines, totals), "Bank reconciliation");
      createAuditEvent(events.reconciliationUpdated, context.actorId, updated.id);
      return updated;
    },
    async softDeleteDraftBankReconciliation(tenantId: string, id: string, context: BankingContext) {
      const current = await this.getBankReconciliationById(tenantId, id, context);
      assertDraft(current);
      assertPermission(context, permissions.reconciliationDelete, current);
      const deleted = assertFound(await repository.softDeleteDraftBankReconciliation(tenantId, id), "Bank reconciliation");
      createAuditEvent(events.reconciliationDeleted, context.actorId, deleted.id);
      return deleted;
    },
    async cancelDraftBankReconciliation(tenantId: string, id: string, input: unknown, context: BankingContext) {
      cancelReconciliationSchema.parse(input);
      const current = await this.getBankReconciliationById(tenantId, id, context);
      assertDraft(current);
      assertPermission(context, permissions.reconciliationCancel, current);
      const cancelled = assertFound(await repository.cancelDraftBankReconciliation(tenantId, id), "Bank reconciliation");
      createAuditEvent(events.reconciliationCancelled, context.actorId, cancelled.id);
      return cancelled;
    },
    async completeBankReconciliation(tenantId: string, id: string, input: unknown, context: BankingContext) {
      completeReconciliationSchema.parse(input);
      const current = await this.getBankReconciliationById(tenantId, id, context);
      assertDraft(current);
      assertPermission(context, permissions.reconciliationComplete, current);
      const totals = assertFound(await repository.calculateReconciliationTotals(tenantId, id), "Reconciliation totals");
      if (roundMoney(totals.differenceAmount) !== 0) throw new Error("Reconciliation difference must be zero before completion");
      if (roundMoney(totals.unmatchedStatementAmount) !== 0) throw new Error("All statement lines must be matched before completion");
      const completed = assertFound(await repository.completeBankReconciliation(tenantId, id, totals), "Bank reconciliation");
      createAuditEvent(events.reconciliationCompleted, context.actorId, completed.id);
      return completed;
    },
    async getBankReconciliationLines(tenantId: string, id: string, context: BankingContext) {
      await this.getBankReconciliationById(tenantId, id, context);
      return repository.getBankReconciliationLines(tenantId, id);
    },
    async addBankReconciliationLine(tenantId: string, id: string, input: unknown, context: BankingContext) {
      const current = await this.getBankReconciliationById(tenantId, id, context);
      assertDraft(current);
      assertPermission(context, permissions.reconciliationUpdate, current);
      const [line] = buildLines([reconciliationLineInputSchema.parse(input)], id);
      const added = assertFound(await repository.addBankReconciliationLine(tenantId, id, line), "Bank reconciliation line");
      await refreshTotals(tenantId, id);
      createAuditEvent(events.reconciliationLineAdded, context.actorId, added.id);
      return added;
    },
    async replaceBankReconciliationLines(tenantId: string, id: string, input: unknown, context: BankingContext) {
      const current = await this.getBankReconciliationById(tenantId, id, context);
      assertDraft(current);
      assertPermission(context, permissions.reconciliationUpdate, current);
      const parsed = Array.isArray(input) ? input : (input as { lines?: unknown[] }).lines ?? [];
      const lines = buildLines(parsed as BankReconciliationLineInput[], id);
      const replaced = await repository.replaceDraftBankReconciliationLines(tenantId, id, lines);
      await refreshTotals(tenantId, id);
      return replaced;
    },
    async matchBankStatementLine(tenantId: string, id: string, lineId: string, input: unknown, context: BankingContext) {
      const parsed = matchStatementLineSchema.parse(input);
      const current = await this.getBankReconciliationById(tenantId, id, context);
      assertDraft(current);
      assertPermission(context, permissions.reconciliationMatch, current);
      const line = assertFound(current.lines.find((candidate) => candidate.id === lineId), "Bank reconciliation line");
      if (line.matchedJournalEntryLineId) throw new Error("Statement line is already matched");
      const candidates = await repository.getUnreconciledJournalLines({ tenantId, bankAccountId: current.bankAccountId, page: 1, pageSize: 100000 });
      const journalLine = assertFound(candidates.rows.find((candidate) => candidate.journalEntryLineId === parsed.journalEntryLineId), "Unreconciled journal line");
      if (roundMoney(journalLine.amount) !== roundMoney(line.amount)) throw new Error("Statement line amount must equal journal line amount");
      const matched = assertFound(await repository.matchBankStatementLine(tenantId, id, lineId, journalLine.journalEntryId, journalLine.journalEntryLineId), "Bank reconciliation line");
      await refreshTotals(tenantId, id);
      createAuditEvent(events.reconciliationLineMatched, context.actorId, matched.id);
      return matched;
    },
    async unmatchBankStatementLine(tenantId: string, id: string, lineId: string, context: BankingContext) {
      const current = await this.getBankReconciliationById(tenantId, id, context);
      assertDraft(current);
      assertPermission(context, permissions.reconciliationMatch, current);
      const unmatched = assertFound(await repository.unmatchBankStatementLine(tenantId, id, lineId), "Bank reconciliation line");
      await refreshTotals(tenantId, id);
      createAuditEvent(events.reconciliationLineUnmatched, context.actorId, unmatched.id);
      return unmatched;
    },
    async getBankReconciliationStats(input: unknown, context: BankingContext) {
      assertPermission(context, permissions.reconciliationView);
      const parsed = bankReconciliationListSchema.pick({ tenantId: true, companyId: true, branchId: true }).parse(input);
      return repository.getBankReconciliationStats(parsed);
    },
  };
}

export const bankingService = createBankingService();
