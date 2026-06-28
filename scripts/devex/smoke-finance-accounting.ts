import { createAccountingRepository } from "../../modules/finance/accounting/repository";
import { createAccountingService } from "../../modules/finance/accounting/service";
import { createMigrationKnex, resolveDatabaseUrl } from "../db/migration-runner";
import { run as runTenantMigrations } from "../db/migrate-tenant";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const tenantId = process.env.VERCENT_TENANT_ID ?? process.env.TENANT_ID ?? "demo-tenant";
const context = { tenantId, actorId: "smoke-test", roles: ["admin"], permissions: ["*"] };

export async function run() {
  await runTenantMigrations();
  const tenantUrl = resolveDatabaseUrl("tenant");
  const database = createMigrationKnex(tenantUrl.value);
  const accounting = createAccountingService(createAccountingRepository(database));
  const suffix = Date.now().toString(36).toUpperCase();

  try {
    const year = await accounting.createFiscalYear({ tenantId, name: `FY Smoke ${suffix}`, startDate: "2026-04-01", endDate: "2027-03-31", isDefault: true }, context);
    const asset = await accounting.createAccount({ tenantId, accountCode: `FA-${suffix}-1000`, accountName: `Smoke Cash ${suffix}`, accountType: "ASSET" }, context);
    const liability = await accounting.createAccount({ tenantId, accountCode: `FA-${suffix}-2000`, accountName: `Smoke Liability ${suffix}`, accountType: "LIABILITY" }, context);
    const income = await accounting.createAccount({ tenantId, accountCode: `FA-${suffix}-4000`, accountName: `Smoke Income ${suffix}`, accountType: "INCOME" }, context);
    const expense = await accounting.createAccount({ tenantId, accountCode: `FA-${suffix}-5000`, accountName: `Smoke Expense ${suffix}`, accountType: "EXPENSE" }, context);

    const journal = await accounting.createJournalEntry({
      tenantId,
      fiscalYearId: year.id,
      journalDate: "2026-06-21",
      narration: "Finance accounting smoke balanced journal",
      lines: [
        { accountId: asset.id, debitAmount: 1000 },
        { accountId: income.id, creditAmount: 1000 },
      ],
    }, context);
    const posted = await accounting.postJournalEntry(tenantId, journal.id, context);
    if (posted.status !== "POSTED") throw new Error("Journal was not posted");
    const trial = await accounting.getTrialBalance({ tenantId, fiscalYearId: year.id }, context);
    if (!trial.some((row) => row.accountId === asset.id && row.debit === 1000)) throw new Error("Trial balance did not include posted debit");
    await accounting.createJournalEntry({
      tenantId,
      fiscalYearId: year.id,
      lines: [
        { accountId: expense.id, debitAmount: 500 },
        { accountId: liability.id, creditAmount: 400 },
      ],
    }, context).then(
      () => {
        throw new Error("Unbalanced journal should have failed");
      },
      (error) => {
        if (error instanceof Error && !error.message.includes("balance")) throw error;
      },
    );

    return { status: "passed" as const, tenantId, fiscalYearId: year.id, journalEntryId: posted.id, trialBalanceRows: trial.length, databaseUrlVariable: tenantUrl.variable, checkedAt: new Date().toISOString() };
  } finally {
    await database.destroy();
  }
}

if (resolve(process.argv[1] ?? "") === fileURLToPath(import.meta.url)) {
  run()
    .then((result) => console.log(JSON.stringify(result, null, 2)))
    .catch((error) => {
      console.error(error instanceof Error ? error.stack : error);
      process.exitCode = 1;
    });
}
