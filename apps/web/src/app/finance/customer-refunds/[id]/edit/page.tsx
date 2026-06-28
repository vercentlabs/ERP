import Link from "next/link";
import { ModuleHeader } from "../../../../../components/layout/ModuleHeader";
import { listAccounts } from "../../../../../features/finance/accounting/api";
import { updateCustomerRefundAction } from "../../../../../features/finance/customer-refunds/actions";
import { getCustomerRefund } from "../../../../../features/finance/customer-refunds/api";
import { listCustomers } from "../../../../../features/master-data/api";

export default async function EditCustomerRefundPage({ params }: { params: { id: string } }) {
  const [refund, customers, accounts] = await Promise.all([getCustomerRefund(params.id), listCustomers({ status: "ACTIVE", pageSize: "100" }), listAccounts({ isActive: "true", pageSize: "100" })]);
  const refundAccounts = accounts.rows.filter((account) => account.isActive && (account.isCashAccount || account.isBankAccount));
  if (refund.status !== "DRAFT") {
    return <main className="page-shell"><ModuleHeader title="Refund locked" eyebrow="Customer Refunds" description="Posted and cancelled refunds cannot be edited." actions={<Link className="vercent-button" href={`/finance/customer-refunds/${refund.id}`}>Back</Link>} /></main>;
  }
  return (
    <main className="page-shell">
      <ModuleHeader title={`Edit ${refund.refundNumber}`} eyebrow="Customer Refunds" description="Draft refund details and credit-note allocations." actions={<Link className="vercent-button secondary" href={`/finance/customer-refunds/${refund.id}`}>Back</Link>} />
      <form action={updateCustomerRefundAction.bind(null, refund.id)} className="vercent-form">
        <label>Customer<select name="customerId" defaultValue={refund.customerId} required>{customers.rows.map((customer) => <option key={customer.id} value={customer.id}>{customer.customerNumber}</option>)}</select></label>
        <label>Refund date<input name="refundDate" type="date" defaultValue={refund.refundDate} /></label>
        <label>Posting date<input name="postingDate" type="date" defaultValue={refund.postingDate ?? ""} /></label>
        <label>Payment method<select name="paymentMethod" defaultValue={refund.paymentMethod}><option>CASH</option><option>BANK_TRANSFER</option><option>CHEQUE</option><option>UPI</option><option>CARD</option><option>OTHER</option></select></label>
        <label>Cash/bank account<select name="depositAccountId" defaultValue={refund.depositAccountId} required>{refundAccounts.map((account) => <option key={account.id} value={account.id}>{account.accountCode} - {account.accountName}</option>)}</select></label>
        <label>Total refund<input name="totalAmount" type="number" step="0.01" defaultValue={refund.totalAmount} required /></label>
        <label>Reference number<input name="referenceNumber" defaultValue={refund.referenceNumber ?? ""} /></label>
        <label>Notes<textarea name="notes" defaultValue={refund.notes ?? ""} /></label>
        <section className="vercent-panel"><h2>Credit notes</h2>{[...refund.allocations, ...Array.from({ length: Math.max(1, 3 - refund.allocations.length) }, () => undefined)].map((allocation, index) => <div className="vercent-toolbar" key={allocation?.id ?? index}><input name="creditNoteId" placeholder="Sales credit note ID" defaultValue={allocation?.creditNoteId ?? ""} /><input name="amount" type="number" step="0.01" placeholder="Refund amount" defaultValue={allocation?.amount ?? ""} /></div>)}</section>
        <button type="submit">Save refund</button>
      </form>
    </main>
  );
}
