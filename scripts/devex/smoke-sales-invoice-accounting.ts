import { createAccountingRepository } from "../../modules/finance/accounting/repository";
import { createAccountingService } from "../../modules/finance/accounting/service";
import { createMasterDataRepository } from "../../modules/master-data/foundation/repository";
import { createMasterDataService } from "../../modules/master-data/foundation/service";
import { createSalesInvoicesRepository } from "../../modules/sales/invoices/repository";
import { createSalesInvoicesService } from "../../modules/sales/invoices/service";
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
  const masterData = createMasterDataService(createMasterDataRepository(database));
  const invoices = createSalesInvoicesService(createSalesInvoicesRepository(database), createMasterDataRepository(database), undefined as never, undefined as never, accounting);
  const suffix = Date.now().toString(36).toUpperCase();

  try {
    const year = await accounting.createFiscalYear({ tenantId, name: `SIA FY ${suffix}`, startDate: "2026-04-01", endDate: "2027-03-31", isDefault: true }, context);
    const ar = await accounting.createAccount({ tenantId, accountCode: `SIA-${suffix}-1100`, accountName: `AR ${suffix}`, accountType: "ASSET" }, context);
    const income = await accounting.createAccount({ tenantId, accountCode: `SIA-${suffix}-4100`, accountName: `Sales ${suffix}`, accountType: "INCOME" }, context);
    const tax = await accounting.createAccount({ tenantId, accountCode: `SIA-${suffix}-2100`, accountName: `Tax Payable ${suffix}`, accountType: "LIABILITY" }, context);
    await accounting.updateAccountingSettings({ tenantId, accountsReceivableAccountId: ar.id, salesIncomeAccountId: income.id, salesTaxPayableAccountId: tax.id }, context);
    const uom = await masterData.createUom({ tenantId, code: `SIA${suffix.slice(-4)}`, name: `SIA UOM ${suffix}`, isBase: true }, context);
    const item = await masterData.createItem({ tenantId, itemNumber: `SIA-SVC-${suffix}`, sku: `SIA-SVC-${suffix}`, name: `SIA Service ${suffix}`, itemType: "SERVICE", baseUomId: uom.id, isStockItem: false, sellingPrice: 100 }, context);
    const party = await masterData.createParty({ tenantId, partyNumber: `SIA-PARTY-${suffix}`, partyType: "COMPANY", displayName: `SIA Customer ${suffix}` }, context);
    const customer = await masterData.createCustomer({ tenantId, partyId: party.id, customerNumber: `SIA-CUST-${suffix}` }, context);
    const invoice = await invoices.create({ tenantId, customerId: customer.id, invoiceDate: "2026-06-21", lines: [{ itemId: item.id, uomId: uom.id, quantity: 2, unitPrice: 100, taxRate: 18 }] }, context);
    const issued = await invoices.issue(tenantId, invoice.id, {}, context);
    const posted = await invoices.postToAccounting(tenantId, issued.id, {}, context);
    if (posted.invoice.accountingStatus !== "POSTED" || !posted.invoice.journalEntryId) throw new Error("Invoice was not linked to posted accounting journal");
    await invoices.postToAccounting(tenantId, issued.id, {}, context).then(
      () => { throw new Error("Duplicate accounting posting should have failed"); },
      (error) => { if (error instanceof Error && !error.message.includes("already")) throw error; },
    );
    const trial = await accounting.getTrialBalance({ tenantId, fiscalYearId: year.id }, context);
    if (!trial.some((row) => row.accountId === ar.id && row.debit === issued.totalAmount)) throw new Error("Trial balance did not include AR debit");
    return { status: "passed" as const, tenantId, invoiceId: posted.invoice.id, journalEntryId: posted.invoice.journalEntryId, trialBalanceRows: trial.length, databaseUrlVariable: tenantUrl.variable, checkedAt: new Date().toISOString() };
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
