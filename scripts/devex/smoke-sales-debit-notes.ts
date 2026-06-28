import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createAccountingRepository } from "../../modules/finance/accounting/repository";
import { createAccountingService } from "../../modules/finance/accounting/service";
import { createMasterDataRepository } from "../../modules/master-data/foundation/repository";
import { createMasterDataService } from "../../modules/master-data/foundation/service";
import { createSalesDebitNotesRepository } from "../../modules/sales/debit-notes/repository";
import { createSalesDebitNotesService } from "../../modules/sales/debit-notes/service";
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
  const debitNotes = createSalesDebitNotesService(createSalesDebitNotesRepository(database), invoiceRepo, masterDataRepo, accounting);
  const suffix = Date.now().toString(36).toUpperCase();

  try {
    const year = await accounting.createFiscalYear({ tenantId, name: `SDN FY ${suffix}`, startDate: "2026-04-01", endDate: "2027-03-31", isDefault: true }, context);
    const ar = await accounting.createAccount({ tenantId, accountCode: `SDN-${suffix}-1100`, accountName: `AR ${suffix}`, accountType: "ASSET" }, context);
    const income = await accounting.createAccount({ tenantId, accountCode: `SDN-${suffix}-4100`, accountName: `Sales ${suffix}`, accountType: "INCOME" }, context);
    const charges = await accounting.createAccount({ tenantId, accountCode: `SDN-${suffix}-4300`, accountName: `Additional Charges ${suffix}`, accountType: "INCOME" }, context);
    const tax = await accounting.createAccount({ tenantId, accountCode: `SDN-${suffix}-2100`, accountName: `Tax Payable ${suffix}`, accountType: "LIABILITY" }, context);
    await accounting.updateAccountingSettings({ tenantId, accountsReceivableAccountId: ar.id, salesIncomeAccountId: income.id, additionalChargesIncomeAccountId: charges.id, salesTaxPayableAccountId: tax.id }, context);
    const uom = await masterData.createUom({ tenantId, code: `SDN${suffix.slice(-4)}`, name: `SDN UOM ${suffix}`, isBase: true }, context);
    const item = await masterData.createItem({ tenantId, itemNumber: `SDN-SVC-${suffix}`, sku: `SDN-SVC-${suffix}`, name: `SDN Service ${suffix}`, itemType: "SERVICE", baseUomId: uom.id, isStockItem: false, sellingPrice: 100 }, context);
    const party = await masterData.createParty({ tenantId, partyNumber: `SDN-PARTY-${suffix}`, partyType: "COMPANY", displayName: `SDN Customer ${suffix}` }, context);
    const customer = await masterData.createCustomer({ tenantId, partyId: party.id, customerNumber: `SDN-CUST-${suffix}` }, context);
    const invoice = await invoices.create({ tenantId, customerId: customer.id, invoiceDate: "2026-06-21", lines: [{ itemId: item.id, uomId: uom.id, quantity: 1, unitPrice: 100, taxRate: 18 }] }, context);
    const issued = await invoices.issue(tenantId, invoice.id, {}, context);
    await invoices.postToAccounting(tenantId, issued.id, {}, context);
    const debit = await debitNotes.createFromInvoice(tenantId, issued.id, { tenantId, lines: [{ salesInvoiceLineId: issued.lines[0].id, itemId: item.id, quantity: 1, uomId: uom.id, unitAmount: 50, taxRate: 18 }] }, context);
    const posted = await debitNotes.post(tenantId, debit.id, {}, context);
    if (!posted.debitNote.journalEntryId) throw new Error("Debit note was not linked to a journal entry");
    if (posted.invoice.debitedAmount !== 59 || posted.invoice.amountDue !== 177) throw new Error("Invoice debited amount or amount due was not updated");
    await debitNotes.post(tenantId, debit.id, {}, context).then(
      () => { throw new Error("Duplicate debit note posting should have failed"); },
      (error) => { if (error instanceof Error && !error.message.includes("DRAFT")) throw error; },
    );
    const trial = await accounting.getTrialBalance({ tenantId, fiscalYearId: year.id }, context);
    if (!trial.some((row) => row.accountId === ar.id && row.debit >= 177)) throw new Error("Trial balance did not include AR debit");
    if (!trial.some((row) => row.accountId === charges.id && row.credit === 50)) throw new Error("Trial balance did not include additional charges credit");
    return { status: "passed" as const, tenantId, invoiceId: issued.id, debitNoteId: posted.debitNote.id, journalEntryId: posted.debitNote.journalEntryId, databaseUrlVariable: tenantUrl.variable, checkedAt: new Date().toISOString() };
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
