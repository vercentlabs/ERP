import Link from "next/link";
import { ModuleHeader } from "../../../../components/layout/ModuleHeader";
import { listAccounts } from "../../../../features/finance/accounting/api";
import { createCustomerRefundAction } from "../../../../features/finance/customer-refunds/actions";
import { listCustomers } from "../../../../features/master-data/api";

export default async function NewCustomerRefundPage() {
  const [customers, accounts] = await Promise.all([listCustomers({ status: "ACTIVE", pageSize: "100" }), listAccounts({ isActive: "true", pageSize: "100" })]);
  const refundAccounts = accounts.rows.filter((account) => account.isActive && (account.isCashAccount || account.isBankAccount));
  return (
    <main className="page-shell">
      <ModuleHeader title="Create Customer Refund" eyebrow="Finance" description="Refund available credit-note balance through a cash or bank account." actions={<Link className="vercent-button secondary" href="/finance/customer-refunds">Back</Link>} />
      <form action={createCustomerRefundAction} className="vercent-form">
        <label>Customer<select name="customerId" required>{customers.rows.map((customer) => <option key={customer.id} value={customer.id}>{customer.customerNumber}</option>)}</select></label>
        <label>Refund date<input name="refundDate" type="date" defaultValue={new Date().toISOString().slice(0, 10)} /></label>
        <label>Posting date<input name="postingDate" type="date" /></label>
        <label>Payment method<select name="paymentMethod" defaultValue="BANK_TRANSFER"><option>CASH</option><option>BANK_TRANSFER</option><option>CHEQUE</option><option>UPI</option><option>CARD</option><option>OTHER</option></select></label>
        <label>Cash/bank account<select name="depositAccountId" required>{refundAccounts.map((account) => <option key={account.id} value={account.id}>{account.accountCode} - {account.accountName}</option>)}</select></label>
        <label>Total refund<input name="totalAmount" type="number" step="0.01" required /></label>
        <label>Reference number<input name="referenceNumber" /></label>
        <label>Notes<textarea name="notes" /></label>
        <section className="vercent-panel"><h2>Credit notes</h2><p>Enter posted credit note IDs and refund amounts. Refunds cannot exceed available credit.</p>{[0, 1, 2].map((index) => <div className="vercent-toolbar" key={index}><input name="creditNoteId" placeholder="Sales credit note ID" /><input name="amount" type="number" step="0.01" placeholder="Refund amount" /></div>)}</section>
        <button type="submit">Create refund</button>
      </form>
    </main>
  );
}
