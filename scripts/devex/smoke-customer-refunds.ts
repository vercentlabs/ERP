import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createAccountingRepository } from "../../modules/finance/accounting/repository";
import { createAccountingService } from "../../modules/finance/accounting/service";
import { createCustomerRefundsRepository } from "../../modules/finance/customer-refunds/repository";
import { createCustomerRefundsService } from "../../modules/finance/customer-refunds/service";
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
  const accountingRepository = createAccountingRepository(database);
  const invoiceRepository = createSalesInvoicesRepository(database);
  const creditNoteRepository = createSalesCreditNotesRepository(database);
  const accounting = createAccountingService(accountingRepository);
  const masterDataRepository = createMasterDataRepository(database);
  const masterData = createMasterDataService(masterDataRepository);
  const invoices = createSalesInvoicesService(invoiceRepository, masterDataRepository, undefined as never, undefined as never, accounting);
  const creditNotes = createSalesCreditNotesService(creditNoteRepository, invoiceRepository, masterDataRepository, accounting);
  const refunds = createCustomerRefundsService(createCustomerRefundsRepository(database), masterDataRepository, creditNoteRepository, accounting);
  const suffix = Date.now().toString(36).toUpperCase();

  try {
    const year = await accounting.createFiscalYear({ tenantId, name: `RF FY ${suffix}`, startDate: "2026-04-01", endDate: "2027-03-31", isDefault: true }, context);
    const ar = await accounting.createAccount({ tenantId, accountCode: `RF-${suffix}-1100`, accountName: `AR ${suffix}`, accountType: "ASSET" }, context);
    const income = await accounting.createAccount({ tenantId, accountCode: `RF-${suffix}-4100`, accountName: `Sales ${suffix}`, accountType: "INCOME" }, context);
    const returns = await accounting.createAccount({ tenantId, accountCode: `RF-${suffix}-4200`, accountName: `Sales Returns ${suffix}`, accountType: "INCOME" }, context);
    const tax = await accounting.createAccount({ tenantId, accountCode: `RF-${suffix}-2100`, accountName: `Tax ${suffix}`, accountType: "LIABILITY" }, context);
    const bank = await accounting.createAccount({ tenantId, accountCode: `RF-${suffix}-1000`, accountName: `Bank ${suffix}`, accountType: "ASSET", isBankAccount: true }, context);
    await accounting.updateAccountingSettings({ tenantId, accountsReceivableAccountId: ar.id, salesIncomeAccountId: income.id, salesReturnsAccountId: returns.id, salesTaxPayableAccountId: tax.id }, context);
    const uom = await masterData.createUom({ tenantId, code: `RF${suffix.slice(-4)}`, name: `RF UOM ${suffix}`, isBase: true }, context);
    const item = await masterData.createItem({ tenantId, itemNumber: `RF-SVC-${suffix}`, sku: `RF-SVC-${suffix}`, name: `RF Service ${suffix}`, itemType: "SERVICE", baseUomId: uom.id, isStockItem: false, sellingPrice: 100 }, context);
    const party = await masterData.createParty({ tenantId, partyNumber: `RF-PARTY-${suffix}`, partyType: "COMPANY", displayName: `RF Customer ${suffix}` }, context);
    const customer = await masterData.createCustomer({ tenantId, partyId: party.id, customerNumber: `RF-CUST-${suffix}` }, context);
    const invoice = await invoices.create({ tenantId, customerId: customer.id, invoiceDate: "2026-06-21", lines: [{ itemId: item.id, uomId: uom.id, quantity: 1, unitPrice: 100, taxRate: 18 }] }, context);
    const issued = await invoices.issue(tenantId, invoice.id, {}, context);
    await invoices.postToAccounting(tenantId, issued.id, {}, context);
    const credit = await creditNotes.createFromInvoice(tenantId, issued.id, { reason: "Smoke refund credit" }, context);
    const postedCredit = await creditNotes.post(tenantId, credit.id, {}, context);
    const refund = await refunds.create({ tenantId, customerId: customer.id, paymentMethod: "BANK_TRANSFER", depositAccountId: bank.id, refundDate: "2026-06-22", totalAmount: 50, allocations: [{ creditNoteId: postedCredit.creditNote.id, amount: 50 }] }, context);
    const postedRefund = await refunds.post(tenantId, refund.id, {}, context);
    const refreshedCredit = await creditNotes.getById(tenantId, postedCredit.creditNote.id, context);
    if (postedRefund.refund.status !== "POSTED" || !postedRefund.refund.journalEntryId) throw new Error("Refund was not posted with a journal entry");
    if (refreshedCredit.refundedAmount !== 50 || refreshedCredit.availableAmount !== postedCredit.creditNote.totalAmount - 50) throw new Error("Credit note refunded/available amounts were not updated");
    await refunds.create({ tenantId, customerId: customer.id, paymentMethod: "BANK_TRANSFER", depositAccountId: bank.id, totalAmount: refreshedCredit.availableAmount + 1, allocations: [{ creditNoteId: refreshedCredit.id, amount: refreshedCredit.availableAmount + 1 }] }, context).then(
      () => { throw new Error("Over-refund should have failed"); },
      (error) => { if (error instanceof Error && !error.message.includes("available")) throw error; },
    );
    const trial = await accounting.getTrialBalance({ tenantId, fiscalYearId: year.id }, context);
    if (!trial.some((row) => row.accountId === bank.id && row.credit === 50)) throw new Error("Trial balance did not include refund bank credit");
    if (!trial.some((row) => row.accountId === ar.id && row.debit >= issued.totalAmount + 50)) throw new Error("Trial balance did not include refund AR debit");
    return { status: "passed" as const, tenantId, invoiceId: issued.id, creditNoteId: refreshedCredit.id, refundId: postedRefund.refund.id, trialBalanceRows: trial.length, databaseUrlVariable: tenantUrl.variable, checkedAt: new Date().toISOString() };
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
