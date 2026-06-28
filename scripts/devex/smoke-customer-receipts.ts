import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createAccountingRepository } from "../../modules/finance/accounting/repository";
import { createAccountingService } from "../../modules/finance/accounting/service";
import { createCustomerReceiptsRepository } from "../../modules/finance/customer-receipts/repository";
import { createCustomerReceiptsService } from "../../modules/finance/customer-receipts/service";
import { createMasterDataRepository } from "../../modules/master-data/foundation/repository";
import { createMasterDataService } from "../../modules/master-data/foundation/service";
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
  const accounting = createAccountingService(accountingRepository);
  const masterDataRepository = createMasterDataRepository(database);
  const masterData = createMasterDataService(masterDataRepository);
  const invoices = createSalesInvoicesService(invoiceRepository, masterDataRepository, undefined as never, undefined as never, accounting);
  const receipts = createCustomerReceiptsService(createCustomerReceiptsRepository(database), masterDataRepository, invoiceRepository, accounting);
  const suffix = Date.now().toString(36).toUpperCase();

  try {
    const year = await accounting.createFiscalYear({ tenantId, name: `CR FY ${suffix}`, startDate: "2026-04-01", endDate: "2027-03-31", isDefault: true }, context);
    const ar = await accounting.createAccount({ tenantId, accountCode: `CR-${suffix}-1100`, accountName: `AR ${suffix}`, accountType: "ASSET" }, context);
    const income = await accounting.createAccount({ tenantId, accountCode: `CR-${suffix}-4100`, accountName: `Sales ${suffix}`, accountType: "INCOME" }, context);
    const tax = await accounting.createAccount({ tenantId, accountCode: `CR-${suffix}-2100`, accountName: `Tax ${suffix}`, accountType: "LIABILITY" }, context);
    const bank = await accounting.createAccount({ tenantId, accountCode: `CR-${suffix}-1000`, accountName: `Bank ${suffix}`, accountType: "ASSET", isBankAccount: true }, context);
    await accounting.updateAccountingSettings({ tenantId, accountsReceivableAccountId: ar.id, salesIncomeAccountId: income.id, salesTaxPayableAccountId: tax.id }, context);
    const uom = await masterData.createUom({ tenantId, code: `CR${suffix.slice(-4)}`, name: `CR UOM ${suffix}`, isBase: true }, context);
    const item = await masterData.createItem({ tenantId, itemNumber: `CR-SVC-${suffix}`, sku: `CR-SVC-${suffix}`, name: `CR Service ${suffix}`, itemType: "SERVICE", baseUomId: uom.id, isStockItem: false, sellingPrice: 100 }, context);
    const party = await masterData.createParty({ tenantId, partyNumber: `CR-PARTY-${suffix}`, partyType: "COMPANY", displayName: `CR Customer ${suffix}` }, context);
    const customer = await masterData.createCustomer({ tenantId, partyId: party.id, customerNumber: `CR-CUST-${suffix}` }, context);
    const invoice = await invoices.create({ tenantId, customerId: customer.id, invoiceDate: "2026-06-21", lines: [{ itemId: item.id, uomId: uom.id, quantity: 2, unitPrice: 100, taxRate: 18 }] }, context);
    const issued = await invoices.issue(tenantId, invoice.id, {}, context);
    await invoices.postToAccounting(tenantId, issued.id, {}, context);
    const firstReceipt = await receipts.create({ tenantId, customerId: customer.id, paymentMethod: "BANK_TRANSFER", depositAccountId: bank.id, receiptDate: "2026-06-22", amountReceived: 100, allocations: [{ salesInvoiceId: issued.id, allocatedAmount: 100 }] }, context);
    await receipts.post(tenantId, firstReceipt.id, {}, context);
    const partial = await invoices.getById(tenantId, issued.id, context);
    if (partial.paymentStatus !== "PARTIALLY_PAID" || partial.amountDue !== issued.totalAmount - 100) throw new Error("Partial receipt did not update invoice correctly");
    const secondReceipt = await receipts.create({ tenantId, customerId: customer.id, paymentMethod: "BANK_TRANSFER", depositAccountId: bank.id, receiptDate: "2026-06-23", amountReceived: partial.amountDue, allocations: [{ salesInvoiceId: issued.id, allocatedAmount: partial.amountDue }] }, context);
    await receipts.post(tenantId, secondReceipt.id, {}, context);
    const paid = await invoices.getById(tenantId, issued.id, context);
    if (paid.paymentStatus !== "PAID" || paid.amountDue !== 0) throw new Error("Full receipt did not mark invoice paid");
    await receipts.create({ tenantId, customerId: customer.id, paymentMethod: "BANK_TRANSFER", depositAccountId: bank.id, amountReceived: 1, allocations: [{ salesInvoiceId: issued.id, allocatedAmount: 1 }] }, context).then(
      () => { throw new Error("Overpayment should have failed"); },
      (error) => { if (error instanceof Error && !error.message.includes("amount due")) throw error; },
    );
    const trial = await accounting.getTrialBalance({ tenantId, fiscalYearId: year.id }, context);
    if (!trial.some((row) => row.accountId === bank.id && row.debit === issued.totalAmount)) throw new Error("Trial balance did not include bank receipt debit");
    if (!trial.some((row) => row.accountId === ar.id && row.debit === issued.totalAmount && row.credit === issued.totalAmount)) throw new Error("Trial balance did not include invoice AR and receipt AR");
    return { status: "passed" as const, tenantId, invoiceId: issued.id, paymentStatus: paid.paymentStatus, trialBalanceRows: trial.length, databaseUrlVariable: tenantUrl.variable, checkedAt: new Date().toISOString() };
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
