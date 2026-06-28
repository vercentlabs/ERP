import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createAccountingRepository } from "../../modules/finance/accounting/repository";
import { createAccountingService } from "../../modules/finance/accounting/service";
import { createMasterDataRepository } from "../../modules/master-data/foundation/repository";
import { createMasterDataService } from "../../modules/master-data/foundation/service";
import { createSalesCreditNotesRepository } from "../../modules/sales/credit-notes/repository";
import { createSalesCreditNotesService } from "../../modules/sales/credit-notes/service";
import { createSalesInvoicesRepository } from "../../modules/sales/invoices/repository";
import { createSalesInvoicesService } from "../../modules/sales/invoices/service";
import { createMigrationKnex, resolveDatabaseUrl } from "../db/migration-runner";
import { run as runTenantMigrations } from "../db/migrate-tenant";

const tenantId = process.env.VERCENT_TENANT_ID ?? process.env.TENANT_ID ?? "demo-tenant";
const context = { tenantId, actorId: "smoke-test", roles: ["admin"], permissions: ["*"] };

export async function run() {
  await runTenantMigrations();
  const tenantUrl = resolveDatabaseUrl("tenant");
  const database = createMigrationKnex(tenantUrl.value);
  const accounting = createAccountingService(createAccountingRepository(database));
  const masterDataRepo = createMasterDataRepository(database);
  const masterData = createMasterDataService(masterDataRepo);
  const invoiceRepo = createSalesInvoicesRepository(database);
  const invoices = createSalesInvoicesService(invoiceRepo, masterDataRepo, undefined as never, undefined as never, accounting);
  const creditNotes = createSalesCreditNotesService(createSalesCreditNotesRepository(database), invoiceRepo, masterDataRepo, accounting);
  const suffix = Date.now().toString(36).toUpperCase();

  try {
    const year = await accounting.createFiscalYear({ tenantId, name: `SCN FY ${suffix}`, startDate: "2026-04-01", endDate: "2027-03-31", isDefault: true }, context);
    const ar = await accounting.createAccount({ tenantId, accountCode: `SCN-${suffix}-1100`, accountName: `AR ${suffix}`, accountType: "ASSET" }, context);
    const income = await accounting.createAccount({ tenantId, accountCode: `SCN-${suffix}-4100`, accountName: `Sales ${suffix}`, accountType: "INCOME" }, context);
    const returns = await accounting.createAccount({ tenantId, accountCode: `SCN-${suffix}-4200`, accountName: `Sales Returns ${suffix}`, accountType: "INCOME", normalBalance: "DEBIT" }, context);
    const tax = await accounting.createAccount({ tenantId, accountCode: `SCN-${suffix}-2100`, accountName: `Tax Payable ${suffix}`, accountType: "LIABILITY" }, context);
    await accounting.updateAccountingSettings({ tenantId, accountsReceivableAccountId: ar.id, salesIncomeAccountId: income.id, salesReturnsAccountId: returns.id, salesTaxPayableAccountId: tax.id }, context);
    const uom = await masterData.createUom({ tenantId, code: `SCN${suffix.slice(-4)}`, name: `SCN UOM ${suffix}`, isBase: true }, context);
    const item = await masterData.createItem({ tenantId, itemNumber: `SCN-SVC-${suffix}`, sku: `SCN-SVC-${suffix}`, name: `SCN Service ${suffix}`, itemType: "SERVICE", baseUomId: uom.id, isStockItem: false, sellingPrice: 100 }, context);
    const party = await masterData.createParty({ tenantId, partyNumber: `SCN-PARTY-${suffix}`, partyType: "COMPANY", displayName: `SCN Customer ${suffix}` }, context);
    const customer = await masterData.createCustomer({ tenantId, partyId: party.id, customerNumber: `SCN-CUST-${suffix}` }, context);
    const invoice = await invoices.create({ tenantId, customerId: customer.id, invoiceDate: "2026-06-21", lines: [{ itemId: item.id, uomId: uom.id, quantity: 2, unitPrice: 100, taxRate: 18 }] }, context);
    const issued = await invoices.issue(tenantId, invoice.id, {}, context);
    await invoices.postToAccounting(tenantId, issued.id, {}, context);
    const credit = await creditNotes.createFromInvoice(tenantId, issued.id, { tenantId, lines: [{ salesInvoiceLineId: issued.lines[0].id, itemId: item.id, quantity: 1, uomId: uom.id, unitPrice: 100, taxRate: 18 }] }, context);
    const posted = await creditNotes.post(tenantId, credit.id, {}, context);
    if (!posted.creditNote.journalEntryId) throw new Error("Credit note was not linked to a journal entry");
    if (posted.invoice.creditedAmount !== 118 || posted.invoice.amountDue !== 118) throw new Error("Invoice credited amount or amount due was not updated");
    await creditNotes.post(tenantId, credit.id, {}, context).then(
      () => { throw new Error("Duplicate credit note posting should have failed"); },
      (error) => { if (error instanceof Error && !error.message.includes("DRAFT")) throw error; },
    );
    const trial = await accounting.getTrialBalance({ tenantId, fiscalYearId: year.id }, context);
    if (!trial.some((row) => row.accountId === returns.id && row.debit === 100)) throw new Error("Trial balance did not include sales returns debit");
    return { status: "passed" as const, tenantId, invoiceId: issued.id, creditNoteId: posted.creditNote.id, journalEntryId: posted.creditNote.journalEntryId, databaseUrlVariable: tenantUrl.variable, checkedAt: new Date().toISOString() };
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
