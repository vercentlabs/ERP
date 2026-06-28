import { randomUUID } from "node:crypto";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createAccountingRepository } from "../../modules/finance/accounting/repository";
import { createAccountingService } from "../../modules/finance/accounting/service";
import { createBankingRepository } from "../../modules/finance/banking/repository";
import { createBankingService } from "../../modules/finance/banking/service";
import { createMigrationKnex, resolveDatabaseUrl } from "../db/migration-runner";
import { run as runTenantMigrations } from "../db/migrate-tenant";

const tenantId = process.env.VERCENT_TENANT_ID ?? process.env.TENANT_ID ?? "demo-tenant";
const context = { tenantId, actorId: "smoke-test", roles: ["admin"], permissions: ["*"] };

export async function run() {
  await runTenantMigrations();
  const tenantUrl = resolveDatabaseUrl("tenant");
  const database = createMigrationKnex(tenantUrl.value);
  const accounting = createAccountingService(createAccountingRepository(database));
  const banking = createBankingService(createBankingRepository(database), accounting);
  const suffix = Date.now().toString(36).toUpperCase();

  try {
    const year = await accounting.createFiscalYear({ tenantId, name: `BANK FY ${suffix}`, startDate: "2026-04-01", endDate: "2027-03-31", isDefault: true }, context);
    const bankAccount = await accounting.createAccount({ tenantId, accountCode: `BANK-${suffix}-1000`, accountName: `Operating Bank ${suffix}`, accountType: "ASSET", isBankAccount: true }, context);
    const clearing = await accounting.createAccount({ tenantId, accountCode: `BANK-${suffix}-9999`, accountName: `Clearing ${suffix}`, accountType: "LIABILITY" }, context);
    const bank = await banking.createBankAccount({ tenantId, accountId: bankAccount.id, accountName: `Operating Bank ${suffix}`, bankName: "Smoke Bank", accountType: "CURRENT", isDefault: true }, context);
    const receiptJournal = await accounting.createJournalEntry({ tenantId, fiscalYearId: year.id, journalDate: "2026-06-21", postingDate: "2026-06-21", referenceType: "CUSTOMER_RECEIPT", referenceId: randomUUID(), sourceModule: "FINANCE", narration: "Smoke receipt", lines: [{ accountId: bankAccount.id, debitAmount: 100, narration: "Receipt" }, { accountId: clearing.id, creditAmount: 100, narration: "Receipt" }] }, context);
    const postedReceipt = await accounting.postJournalEntry(tenantId, receiptJournal.id, context);
    const refundJournal = await accounting.createJournalEntry({ tenantId, fiscalYearId: year.id, journalDate: "2026-06-22", postingDate: "2026-06-22", referenceType: "CUSTOMER_REFUND", referenceId: randomUUID(), sourceModule: "FINANCE", narration: "Smoke refund", lines: [{ accountId: clearing.id, debitAmount: 25, narration: "Refund" }, { accountId: bankAccount.id, creditAmount: 25, narration: "Refund" }] }, context);
    const postedRefund = await accounting.postJournalEntry(tenantId, refundJournal.id, context);
    const ledger = await banking.getCashBankLedger({ tenantId, bankAccountId: bank.id }, context);
    if (!ledger.rows.some((row) => row.referenceType === "CUSTOMER_RECEIPT" && row.debitAmount === 100)) throw new Error("Receipt debit was not present in cash/bank ledger");
    if (!ledger.rows.some((row) => row.referenceType === "CUSTOMER_REFUND" && row.creditAmount === 25)) throw new Error("Refund credit was not present in cash/bank ledger");
    const receiptLine = postedReceipt.lines.find((line) => line.accountId === bankAccount.id);
    const refundLine = postedRefund.lines.find((line) => line.accountId === bankAccount.id);
    if (!receiptLine || !refundLine) throw new Error("Posted journal lines were missing");
    const reconciliation = await banking.createBankReconciliation({ tenantId, bankAccountId: bank.id, statementStartDate: "2026-06-01", statementEndDate: "2026-06-30", closingStatementBalance: 75, lines: [{ transactionDate: "2026-06-21", description: "Receipt", debitAmount: 100 }, { transactionDate: "2026-06-22", description: "Refund", creditAmount: 25 }] }, context);
    await banking.matchBankStatementLine(tenantId, reconciliation.id, reconciliation.lines[0].id, { journalEntryLineId: receiptLine.id }, context);
    await banking.matchBankStatementLine(tenantId, reconciliation.id, reconciliation.lines[1].id, { journalEntryLineId: refundLine.id }, context);
    const completed = await banking.completeBankReconciliation(tenantId, reconciliation.id, {}, context);
    if (completed.status !== "COMPLETED") throw new Error("Bank reconciliation was not completed");
    await banking.updateDraftBankReconciliation(tenantId, completed.id, { notes: "should fail" }, context).then(
      () => { throw new Error("Completed reconciliation should be immutable"); },
      (error) => { if (error instanceof Error && !error.message.includes("DRAFT")) throw error; },
    );
    return { status: "passed" as const, tenantId, bankAccountId: bank.id, reconciliationId: completed.id, ledgerRows: ledger.total, databaseUrlVariable: tenantUrl.variable, checkedAt: new Date().toISOString() };
  } finally {
    await database.destroy();
  }
}

if (resolve(process.argv[1] ?? "") === fileURLToPath(import.meta.url)) {
  run().then((result) => console.log(JSON.stringify(result, null, 2))).catch((error) => {
    console.error(error instanceof Error ? error.stack : error);
    process.exitCode = 1;
  });
}
