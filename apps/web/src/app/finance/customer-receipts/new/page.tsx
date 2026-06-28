import Link from "next/link";
import { ModuleHeader } from "../../../../components/layout/ModuleHeader";
import { listAccounts } from "../../../../features/finance/accounting/api";
import { createCustomerReceiptAction } from "../../../../features/finance/customer-receipts/actions";
import { listCustomers } from "../../../../features/master-data/api";

export default async function NewCustomerReceiptPage() {
  const [customers, accounts] = await Promise.all([listCustomers({ status: "ACTIVE", pageSize: "100" }), listAccounts({ isActive: "true", pageSize: "100" })]);
  const depositAccounts = accounts.rows.filter((account) => account.isActive && (account.isCashAccount || account.isBankAccount));
  return (
    <main className="page-shell">
      <ModuleHeader title="Create Customer Receipt" eyebrow="Finance" description="Allocate a customer collection to one or more issued, accounting-posted invoices." actions={<Link className="vercent-button secondary" href="/finance/customer-receipts">Back</Link>} />
      <form action={createCustomerReceiptAction} className="vercent-form">
        <label>Customer<select name="customerId" required>{customers.rows.map((customer) => <option key={customer.id} value={customer.id}>{customer.customerNumber}</option>)}</select></label>
        <label>Receipt date<input name="receiptDate" type="date" defaultValue={new Date().toISOString().slice(0, 10)} /></label>
        <label>Posting date<input name="postingDate" type="date" /></label>
        <label>Payment method<select name="paymentMethod" defaultValue="BANK_TRANSFER"><option>CASH</option><option>BANK_TRANSFER</option><option>CHEQUE</option><option>UPI</option><option>CARD</option><option>OTHER</option></select></label>
        <label>Deposit account<select name="depositAccountId" required>{depositAccounts.map((account) => <option key={account.id} value={account.id}>{account.accountCode} - {account.accountName}</option>)}</select></label>
        <label>Amount received<input name="amountReceived" type="number" step="0.01" required /></label>
        <label>Currency<input name="currency" defaultValue="INR" /></label>
        <label>Exchange rate<input name="exchangeRate" type="number" step="0.000001" defaultValue="1" /></label>
        <label>Reference number<input name="referenceNumber" /></label>
        <label>Reference date<input name="referenceDate" type="date" /></label>
        <label>Notes<textarea name="notes" /></label>
        <section className="vercent-panel"><h2>Allocations</h2><p>Enter invoice IDs and allocation amounts. Overpayments and unapplied amounts are blocked.</p>{[0, 1, 2].map((index) => <div className="vercent-toolbar" key={index}><input name="salesInvoiceId" placeholder="Sales invoice ID" /><input name="allocatedAmount" type="number" step="0.01" placeholder="Allocated amount" /></div>)}</section>
        <button type="submit">Create receipt</button>
      </form>
    </main>
  );
}
