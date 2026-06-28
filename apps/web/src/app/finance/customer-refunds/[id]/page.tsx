import Link from "next/link";
import { ModuleHeader } from "../../../../components/layout/ModuleHeader";
import { cancelCustomerRefundAction, deleteCustomerRefundAction, postCustomerRefundAction } from "../../../../features/finance/customer-refunds/actions";
import { getCustomerRefund } from "../../../../features/finance/customer-refunds/api";

export default async function CustomerRefundDetailPage({ params }: { params: { id: string } }) {
  const refund = await getCustomerRefund(params.id);
  return (
    <main className="page-shell">
      <ModuleHeader title={refund.refundNumber} eyebrow="Customer Refunds" description={`Refund to customer ${refund.customerId}`} actions={<>{refund.status === "DRAFT" ? <Link className="vercent-button" href={`/finance/customer-refunds/${refund.id}/edit`}>Edit</Link> : null}<Link className="vercent-button secondary" href="/finance/customer-refunds">Back</Link></>} />
      <section className="grid-panel">
        <article className="metric-card"><span>Status</span><strong>{refund.status}</strong></article><article className="metric-card"><span>Method</span><strong>{refund.paymentMethod}</strong></article><article className="metric-card"><span>Refunded</span><strong>{refund.totalAmount.toLocaleString("en-IN")}</strong></article><article className="metric-card"><span>Journal</span><strong>{refund.journalEntryId ? <Link href={`/finance/journal-entries/${refund.journalEntryId}`}>{refund.journalEntryId}</Link> : "-"}</strong></article>
        <article className="metric-card"><span>Cash/bank account</span><strong>{refund.depositAccountId}</strong></article><article className="metric-card"><span>Posted at</span><strong>{refund.postedAt ?? "-"}</strong></article>
      </section>
      <section className="vercent-table-wrap"><table className="vercent-table"><thead><tr><th>Credit note</th><th>Refunded amount</th></tr></thead><tbody>{refund.allocations.map((allocation) => <tr key={allocation.id}><td><Link href={`/sales/credit-notes/${allocation.creditNoteId}`}>{allocation.creditNoteId}</Link></td><td>{allocation.amount.toLocaleString("en-IN")}</td></tr>)}</tbody></table></section>
      {refund.status === "DRAFT" ? <section className="vercent-panel"><h2>Actions</h2><form action={postCustomerRefundAction.bind(null, refund.id)} className="vercent-toolbar"><input name="postingDate" type="date" defaultValue={refund.postingDate ?? refund.refundDate} /><button type="submit">Post refund</button></form><form action={cancelCustomerRefundAction.bind(null, refund.id)}><button type="submit">Cancel draft</button></form><form action={deleteCustomerRefundAction.bind(null, refund.id)}><button type="submit">Delete draft</button></form></section> : null}
      <section className="vercent-panel"><h2>Notes</h2><p>{refund.notes ?? "No notes recorded."}</p><p>Posted refund reversal and unapplied customer credit handling are not implemented yet.</p></section>
    </main>
  );
}
