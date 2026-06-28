import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { createAuditEvent } from "./audit";
import { events } from "./events";
import { permissions } from "./permissions";
import { accountingRepository } from "./repository";
import {
  accountCreateSchema, accountGroupCreateSchema, accountListSchema, accountUpdateSchema, fiscalYearCreateSchema, fiscalYearListSchema,
  journalEntryCreateSchema, journalEntryListSchema, journalEntryUpdateSchema, trialBalanceSchema, accountingSettingsUpdateSchema,
} from "./schemas";
import type {
  AccountCreateInput, AccountingContext, AccountingRepository, FiscalYearCreateInput,
  JournalEntryCreateInput, JournalEntryLineInput, JournalEntryLineRecord, JournalEntryRecord, JournalEntryUpdateInput, TrialBalanceRequest,
} from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => { if (!decision.allowed) throw new Error(decision.reasons.join("; ")); };
const assertPermission = (context: AccountingContext, permission: string, record?: unknown) => assertAllowed(evaluatePolicy({ actor: context, permission, record: record as never }));
const assertFound = <T>(record: T | undefined, label: string) => { if (!record) throw new Error(`${label} was not found`); return record; };
const roundMoney = (value: number) => Math.round((value + Number.EPSILON) * 100) / 100;

function calculateTotals(lines: JournalEntryLineRecord[]) {
  return {
    totalDebit: roundMoney(lines.reduce((sum, line) => sum + line.debitAmount, 0)),
    totalCredit: roundMoney(lines.reduce((sum, line) => sum + line.creditAmount, 0)),
  };
}

function assertDraft(journal: JournalEntryRecord) {
  if (journal.status !== "DRAFT") throw new Error("Only DRAFT journal entries can be edited, posted, cancelled, or deleted");
}

export function createAccountingService(repository: AccountingRepository = accountingRepository) {
  async function buildJournalLines(tenantId: string, inputLines: JournalEntryLineInput[]) {
    const lines: JournalEntryLineRecord[] = [];
    for (const [index, line] of inputLines.entries()) {
      const account = assertFound(await repository.getAccountById(tenantId, line.accountId), "Account");
      if (!account.isActive) throw new Error("Inactive accounts cannot be used in journal entries");
      lines.push({
        id: crypto.randomUUID(),
        journalEntryId: "",
        lineNumber: index + 1,
        accountId: line.accountId,
        partyId: line.partyId,
        customerId: line.customerId,
        supplierId: line.supplierId,
        debitAmount: line.debitAmount ?? 0,
        creditAmount: line.creditAmount ?? 0,
        narration: line.narration,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }
    const totals = calculateTotals(lines);
    if (totals.totalDebit !== totals.totalCredit) throw new Error("Journal entry must balance before posting");
    return { lines, totals };
  }

  async function assertOpenFiscalYear(tenantId: string, fiscalYearId: string) {
    const year = assertFound(await repository.getFiscalYearById(tenantId, fiscalYearId), "Fiscal year");
    if (year.status !== "OPEN") throw new Error("Fiscal year must be OPEN");
    return year;
  }

  return {
    async createAccountGroup(input: unknown, context: AccountingContext) {
      assertPermission(context, permissions.accountGroupsCreate);
      const parsed = accountGroupCreateSchema.parse(input);
      const group = await repository.createAccountGroup(parsed);
      createAuditEvent(events.accountCreated, context.actorId, group.id, { code: group.code, type: group.type });
      return group;
    },
    async listAccountGroups(input: unknown, context: AccountingContext) {
      assertPermission(context, permissions.accountGroupsView);
      return repository.listAccountGroups(accountListSchema.parse(input));
    },
    async createAccount(input: AccountCreateInput, context: AccountingContext) {
      assertPermission(context, permissions.accountsCreate);
      const parsed = accountCreateSchema.parse(input);
      if (await repository.getAccountByCode(parsed.tenantId, parsed.accountCode, parsed.companyId)) throw new Error("Account code already exists");
      const account = await repository.createAccount(parsed);
      createAuditEvent(events.accountCreated, context.actorId, account.id, { accountCode: account.accountCode });
      return account;
    },
    async listAccounts(input: unknown, context: AccountingContext) {
      assertPermission(context, permissions.accountsView);
      return repository.listAccounts(accountListSchema.parse(input));
    },
    async getAccountById(tenantId: string, id: string, context: AccountingContext) {
      assertPermission(context, permissions.accountsView);
      return assertFound(await repository.getAccountById(tenantId, id), "Account");
    },
    async updateAccount(tenantId: string, id: string, input: unknown, context: AccountingContext) {
      const account = assertFound(await repository.getAccountById(tenantId, id), "Account");
      assertPermission(context, permissions.accountsUpdate, account);
      const updated = assertFound(await repository.updateAccount(tenantId, id, accountUpdateSchema.parse(input)), "Account");
      createAuditEvent(events.accountUpdated, context.actorId, updated.id);
      return updated;
    },
    async softDeleteAccount(tenantId: string, id: string, context: AccountingContext) {
      const account = assertFound(await repository.getAccountById(tenantId, id), "Account");
      assertPermission(context, permissions.accountsDelete, account);
      const deleted = assertFound(await repository.softDeleteAccount(tenantId, id), "Account");
      createAuditEvent(events.accountDeleted, context.actorId, deleted.id);
      return deleted;
    },
    async createFiscalYear(input: FiscalYearCreateInput, context: AccountingContext) {
      assertPermission(context, permissions.fiscalYearsCreate);
      const year = await repository.createFiscalYear(fiscalYearCreateSchema.parse(input));
      createAuditEvent(events.fiscalYearCreated, context.actorId, year.id);
      return year;
    },
    async listFiscalYears(input: unknown, context: AccountingContext) {
      assertPermission(context, permissions.fiscalYearsView);
      return repository.listFiscalYears(fiscalYearListSchema.parse(input));
    },
    async setDefaultFiscalYear(tenantId: string, id: string, context: AccountingContext) {
      assertPermission(context, permissions.fiscalYearsUpdate);
      const current = assertFound(await repository.getFiscalYearById(tenantId, id), "Fiscal year");
      if (current.status !== "OPEN") throw new Error("Only OPEN fiscal years can be default");
      const year = assertFound(await repository.setDefaultFiscalYear(tenantId, id), "Fiscal year");
      return year;
    },
    async closeFiscalYear(tenantId: string, id: string, context: AccountingContext) {
      assertPermission(context, permissions.fiscalYearsClose);
      const year = assertFound(await repository.closeFiscalYear(tenantId, id), "Fiscal year");
      createAuditEvent(events.fiscalYearClosed, context.actorId, year.id);
      return year;
    },
    async createJournalEntry(input: JournalEntryCreateInput, context: AccountingContext) {
      assertPermission(context, permissions.journalEntriesCreate);
      const parsed = journalEntryCreateSchema.parse(input);
      await assertOpenFiscalYear(parsed.tenantId, parsed.fiscalYearId);
      const { lines, totals } = await buildJournalLines(parsed.tenantId, parsed.lines);
      const journal = await repository.createJournalEntry(parsed, lines, totals);
      createAuditEvent(events.journalEntryCreated, context.actorId, journal.id);
      return journal;
    },
    async listJournalEntries(input: unknown, context: AccountingContext) {
      assertPermission(context, permissions.journalEntriesView);
      return repository.listJournalEntries(journalEntryListSchema.parse(input));
    },
    async getJournalEntryById(tenantId: string, id: string, context: AccountingContext) {
      assertPermission(context, permissions.journalEntriesView);
      return assertFound(await repository.getJournalEntryById(tenantId, id), "Journal entry");
    },
    async updateJournalEntry(tenantId: string, id: string, input: JournalEntryUpdateInput, context: AccountingContext) {
      const current = assertFound(await repository.getJournalEntryById(tenantId, id), "Journal entry");
      assertDraft(current);
      assertPermission(context, permissions.journalEntriesUpdate, current);
      const parsed = journalEntryUpdateSchema.parse(input);
      if (parsed.fiscalYearId) await assertOpenFiscalYear(tenantId, parsed.fiscalYearId);
      const built = parsed.lines ? await buildJournalLines(tenantId, parsed.lines) : undefined;
      const updated = assertFound(await repository.updateJournalEntry(tenantId, id, parsed, built?.lines, built?.totals), "Journal entry");
      createAuditEvent(events.journalEntryUpdated, context.actorId, updated.id);
      return updated;
    },
    async softDeleteJournalEntry(tenantId: string, id: string, context: AccountingContext) {
      const current = assertFound(await repository.getJournalEntryById(tenantId, id), "Journal entry");
      assertDraft(current);
      assertPermission(context, permissions.journalEntriesDelete, current);
      const deleted = assertFound(await repository.softDeleteJournalEntry(tenantId, id), "Journal entry");
      createAuditEvent(events.journalEntryDeleted, context.actorId, deleted.id);
      return deleted;
    },
    async postJournalEntry(tenantId: string, id: string, context: AccountingContext) {
      const current = assertFound(await repository.getJournalEntryById(tenantId, id), "Journal entry");
      assertDraft(current);
      assertPermission(context, permissions.journalEntriesPost, current);
      await assertOpenFiscalYear(tenantId, current.fiscalYearId);
      if (current.lines.length < 2) throw new Error("Journal entry must have at least two lines");
      if (current.totalDebit !== current.totalCredit) throw new Error("Journal entry must balance before posting");
      const posted = assertFound(await repository.postJournalEntry(tenantId, id), "Journal entry");
      createAuditEvent(events.journalEntryPosted, context.actorId, posted.id);
      return posted;
    },
    async cancelJournalEntry(tenantId: string, id: string, context: AccountingContext) {
      const current = assertFound(await repository.getJournalEntryById(tenantId, id), "Journal entry");
      assertDraft(current);
      assertPermission(context, permissions.journalEntriesCancel, current);
      const cancelled = assertFound(await repository.cancelDraftJournalEntry(tenantId, id), "Journal entry");
      createAuditEvent(events.journalEntryCancelled, context.actorId, cancelled.id);
      return cancelled;
    },
    async getJournalEntryLines(tenantId: string, id: string, context: AccountingContext) {
      assertPermission(context, permissions.journalEntriesView);
      return repository.getJournalEntryLines(tenantId, id);
    },
    async getTrialBalance(input: TrialBalanceRequest, context: AccountingContext) {
      assertPermission(context, permissions.trialBalanceView);
      return repository.getTrialBalance(trialBalanceSchema.parse(input));
    },
    async getAccountingSettings(tenantId: string, context: AccountingContext, companyId?: string, branchId?: string) {
      assertPermission(context, permissions.accountingSettingsView);
      return repository.getAccountingSettings(tenantId, companyId, branchId);
    },
    async updateAccountingSettings(input: unknown, context: AccountingContext) {
      assertPermission(context, permissions.accountingSettingsUpdate);
      const parsed = accountingSettingsUpdateSchema.parse(input);
      const accountIds = [parsed.accountsReceivableAccountId, parsed.salesIncomeAccountId, parsed.salesReturnsAccountId, parsed.additionalChargesIncomeAccountId, parsed.salesTaxPayableAccountId, parsed.roundingAdjustmentAccountId].filter(Boolean) as string[];
      for (const accountId of accountIds) {
        const account = assertFound(await repository.getAccountById(parsed.tenantId, accountId), "Account");
        if (!account.isActive) throw new Error("Accounting settings can only reference active accounts");
      }
      const settings = await repository.updateAccountingSettings(parsed);
      createAuditEvent(events.accountingSettingsUpdated, context.actorId, settings.id);
      return settings;
    },
    async resolveOpenFiscalYearForDate(tenantId: string, date: string, context: AccountingContext, companyId?: string) {
      assertPermission(context, permissions.fiscalYearsView);
      return assertFound(await repository.resolveOpenFiscalYearForDate(tenantId, date, companyId), "Open fiscal year");
    },
  };
}

export const accountingService = createAccountingService();
