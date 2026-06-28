import Link from "next/link";
import { ModuleHeader } from "../../../../components/layout/ModuleHeader";
import { getSalesDebitNoteCreditAllocations } from "../../../../features/sales/credit-note-allocations/api";
import { cancelSalesDebitNoteAction, deleteSalesDebitNoteAction, postSalesDebitNoteAction } from "../../../../features/sales/debit-notes/actions";
import { getSalesDebitNote } from "../../../../features/sales/debit-notes/api";

export default async function SalesDebitNoteDetailPage({ params }: { params: { id: string } }) {
  const [note, allocations] = await Promise.all([getSalesDebitNote(params.id), getSalesDebitNoteCreditAllocations(params.id)]);
  return (
    <main className="page-shell">
      <ModuleHeader title={note.debitNoteNumber} eyebrow="Sales Debit Note" description={`${note.status} - ${note.totalAmount}`} actions={<>{note.status === "DRAFT" ? <Link className="vercent-button secondary" href={`/sales/debit-notes/${note.id}/edit`}>Edit</Link> : null}<Link className="vercent-button secondary" href="/sales/debit-notes">Back</Link></>} />
      <section className="metric-grid">
        <div className="metric-card"><span>Subtotal</span><strong>{note.subtotalAmount}</strong></div>
        <div className="metric-card"><span>Tax</span><strong>{note.taxAmount}</strong></div>
        <div className="metric-card"><span>Total debit</span><strong>{note.totalAmount}</strong></div>
        <div className="metric-card"><span>Settled</span><strong>{note.settledAmount.toLocaleString("en-IN")}</strong></div>
        <div className="metric-card"><span>Amount due</span><strong>{note.amountDue.toLocaleString("en-IN")}</strong></div>
        <div className="metric-card"><span>Journal</span><strong>{note.journalEntryId ?? "Not posted"}</strong></div>
      </section>
      {note.status === "DRAFT" && (
        <section className="toolbar">
          <form action={postSalesDebitNoteAction.bind(null, note.id)}><input name="postingDate" type="date" defaultValue={note.postingDate ?? note.debitNoteDate} /><button className="vercent-button" type="submit">Post debit note</button></form>
          <form action={cancelSalesDebitNoteAction.bind(null, note.id)}><button className="vercent-button secondary" type="submit">Cancel</button></form>
          <form action={deleteSalesDebitNoteAction.bind(null, note.id)}><button className="vercent-button danger" type="submit">Delete draft</button></form>
        </section>
      )}
      <section className="detail-grid">
        <div><span>Invoice</span><Link href={`/sales/invoices/${note.salesInvoiceId}`}>{note.salesInvoiceId}</Link></div>
        <div><span>Customer</span><strong>{note.customerId}</strong></div>
        <div><span>Accounting</span><strong>{note.accountingStatus}</strong></div>
        <div><span>Reason</span><strong>{note.reason ?? "Not specified"}</strong></div>
      </section>
      <table className="data-table">
        <thead><tr><th>#</th><th>Item</th><th>Qty</th><th>Unit amount</th><th>Tax</th><th>Total</th></tr></thead>
        <tbody>{note.lines.map((line) => <tr key={line.id}><td>{line.lineNumber}</td><td>{line.itemName}</td><td>{line.quantity}</td><td>{line.unitAmount}</td><td>{line.taxAmount}</td><td>{line.lineTotal}</td></tr>)}</tbody>
      </table>
      <section className="vercent-panel"><h2>Credit Allocations</h2>{allocations.length ? <table className="vercent-table"><thead><tr><th>Credit note</th><th>Date</th><th>Amount</th><th>Notes</th></tr></thead><tbody>{allocations.map((allocation) => <tr key={allocation.id}><td><Link href={`/sales/credit-notes/${allocation.creditNoteId}`}>{allocation.creditNoteId}</Link></td><td>{allocation.allocationDate}</td><td>{allocation.amount.toLocaleString("en-IN")}</td><td>{allocation.notes ?? "-"}</td></tr>)}</tbody></table> : <p>No credit allocations recorded yet.</p>}</section>
    </main>
  );
}
