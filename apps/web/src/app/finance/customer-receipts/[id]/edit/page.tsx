import Link from "next/link";
import { ModuleHeader } from "../../../../../components/layout/ModuleHeader";
import { listAccounts } from "../../../../../features/finance/accounting/api";
import { updateCustomerReceiptAction } from "../../../../../features/finance/customer-receipts/actions";
import { getCustomerReceipt } from "../../../../../features/finance/customer-receipts/api";
import { listCustomers } from "../../../../../features/master-data/api";

export default async function EditCustomerReceiptPage({ params }: { params: { id: string } }) {
  const [receipt, customers, accounts] = await Promise.all([getCustomerReceipt(params.id), listCustomers({ status: "ACTIVE", pageSize: "100" }), listAccounts({ isActive: "true", pageSize: "100" })]);
  const depositAccounts = accounts.rows.filter((account) => account.isActive && (account.isCashAccount || account.isBankAccount));
  if (receipt.status !== "DRAFT") {
    return <main className="page-shell"><ModuleHeader title="Receipt locked" eyebrow="Customer Receipts" description="Posted and cancelled receipts cannot be edited." actions={<Link className="vercent-button" href={`/finance/customer-receipts/${receipt.id}`}>Back</Link>} /></main>;
  }
  return (
    <main className="page-shell">
      <ModuleHeader title={`Edit ${receipt.receiptNumber}`} eyebrow="Customer Receipts" description="Draft receipt details and invoice allocations." actions={<Link className="vercent-button secondary" href={`/finance/customer-receipts/${receipt.id}`}>Back</Link>} />
      <form action={updateCustomerReceiptAction.bind(null, receipt.id)} className="vercent-form">
        <label>Customer<select name="customerId" defaultValue={receipt.customerId} required>{customers.rows.map((customer) => <option key={customer.id} value={customer.id}>{customer.customerNumber}</option>)}</select></label>
        <label>Receipt date<input name="receiptDate" type="date" defaultValue={receipt.receiptDate} /></label>
        <label>Posting date<input name="postingDate" type="date" defaultValue={receipt.postingDate ?? ""} /></label>
        <label>Payment method<select name="paymentMethod" defaultValue={receipt.paymentMethod}><option>CASH</option><option>BANK_TRANSFER</option><option>CHEQUE</option><option>UPI</option><option>CARD</option><option>OTHER</option></select></label>
        <label>Deposit account<select name="depositAccountId" defaultValue={receipt.depositAccountId} required>{depositAccounts.map((account) => <option key={account.id} value={account.id}>{account.accountCode} - {account.accountName}</option>)}</select></label>
        <label>Amount received<input name="amountReceived" type="number" step="0.01" defaultValue={receipt.amountReceived} required /></label>
        <label>Currency<input name="currency" defaultValue={receipt.currency} /></label>
        <label>Exchange rate<input name="exchangeRate" type="number" step="0.000001" defaultValue={receipt.exchangeRate} /></label>
        <label>Reference number<input name="referenceNumber" defaultValue={receipt.referenceNumber ?? ""} /></label>
        <label>Reference date<input name="referenceDate" type="date" defaultValue={receipt.referenceDate ?? ""} /></label>
        <label>Notes<textarea name="notes" defaultValue={receipt.notes ?? ""} /></label>
        <section className="vercent-panel"><h2>Allocations</h2>{[...receipt.allocations, ...Array.from({ length: Math.max(1, 3 - receipt.allocations.length) }, () => undefined)].map((allocation, index) => <div className="vercent-toolbar" key={allocation?.id ?? index}><input name="salesInvoiceId" placeholder="Sales invoice ID" defaultValue={allocation?.salesInvoiceId ?? ""} /><input name="allocatedAmount" type="number" step="0.01" placeholder="Allocated amount" defaultValue={allocation?.allocatedAmount ?? ""} /></div>)}</section>
        <button type="submit">Save receipt</button>
      </form>
    </main>
  );
}
