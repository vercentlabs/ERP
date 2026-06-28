import Link from "next/link";
import { ModuleHeader } from "../../../../components/layout/ModuleHeader";
import { listAccounts } from "../../../../features/finance/accounting/api";
import { createRefundFromCreditNoteAction } from "../../../../features/finance/customer-refunds/actions";
import { getSalesCreditNoteRefunds } from "../../../../features/finance/customer-refunds/api";
import { allocateSalesCreditNoteAction } from "../../../../features/sales/credit-note-allocations/actions";
import { getSalesCreditNoteAllocations } from "../../../../features/sales/credit-note-allocations/api";
import { cancelSalesCreditNoteAction, deleteSalesCreditNoteAction, postSalesCreditNoteAction } from "../../../../features/sales/credit-notes/actions";
import { getSalesCreditNote } from "../../../../features/sales/credit-notes/api";

export default async function SalesCreditNoteDetailPage({ params }: { params: { id: string } }) {
  const [note, allocations, refunds, accounts] = await Promise.all([getSalesCreditNote(params.id), getSalesCreditNoteAllocations(params.id), getSalesCreditNoteRefunds(params.id), listAccounts({ isActive: "true", pageSize: "100" })]);
  const refundAccounts = accounts.rows.filter((account) => account.isActive && (account.isCashAccount || account.isBankAccount));
  return (
    <main className="page-shell">
      <ModuleHeader title={note.creditNoteNumber} eyebrow="Sales Credit Note" description={`${note.status} - ${note.currency} ${note.totalAmount}`} actions={<Link className="vercent-button secondary" href={`/sales/credit-notes/${note.id}/edit`}>Edit</Link>} />
      <section className="metric-grid">
        <div className="metric-card"><span>Subtotal</span><strong>{note.subtotalAmount}</strong></div>
        <div className="metric-card"><span>Tax</span><strong>{note.taxAmount}</strong></div>
        <div className="metric-card"><span>Total credit</span><strong>{note.totalAmount}</strong></div>
        <div className="metric-card"><span>Available</span><strong>{note.availableAmount.toLocaleString("en-IN")}</strong></div>
        <div className="metric-card"><span>Allocated</span><strong>{note.allocatedAmount.toLocaleString("en-IN")}</strong></div>
        <div className="metric-card"><span>Refunded</span><strong>{note.refundedAmount.toLocaleString("en-IN")}</strong></div>
        <div className="metric-card"><span>Journal</span><strong>{note.journalEntryId ?? "Not posted"}</strong></div>
      </section>
      {note.status === "DRAFT" && (
        <section className="toolbar">
          <form action={postSalesCreditNoteAction.bind(null, note.id)}><input name="postingDate" type="date" defaultValue={note.postingDate ?? note.creditNoteDate} /><button className="vercent-button" type="submit">Post credit note</button></form>
          <form action={cancelSalesCreditNoteAction.bind(null, note.id)}><button className="vercent-button secondary" type="submit">Cancel</button></form>
          <form action={deleteSalesCreditNoteAction.bind(null, note.id)}><button className="vercent-button danger" type="submit">Delete draft</button></form>
        </section>
      )}
      <section className="detail-grid">
        <div><span>Invoice</span><Link href={`/sales/invoices/${note.salesInvoiceId}`}>{note.salesInvoiceId}</Link></div>
        <div><span>Customer</span><strong>{note.customerId}</strong></div>
        <div><span>Reason</span><strong>{note.reason ?? "Not specified"}</strong></div>
        <div><span>Return to stock</span><strong>{note.returnToStock ? `Yes (${note.warehouseId ?? "warehouse required"})` : "No"}</strong></div>
      </section>
      <table className="data-table">
        <thead><tr><th>#</th><th>Item</th><th>Qty</th><th>Unit price</th><th>Tax</th><th>Total</th></tr></thead>
        <tbody>{note.lines.map((line) => <tr key={line.id}><td>{line.lineNumber}</td><td>{line.itemName}</td><td>{line.quantity}</td><td>{line.unitPrice}</td><td>{line.taxAmount}</td><td>{line.lineTotal}</td></tr>)}</tbody>
      </table>
      <section className="vercent-panel"><h2>Allocations</h2>{allocations.length ? <table className="vercent-table"><thead><tr><th>Target</th><th>Date</th><th>Amount</th><th>Notes</th></tr></thead><tbody>{allocations.map((allocation) => <tr key={allocation.id}><td><Link href={allocation.targetType === "SALES_INVOICE" ? `/sales/invoices/${allocation.targetId}` : `/sales/debit-notes/${allocation.targetId}`}>{allocation.targetType} {allocation.targetId}</Link></td><td>{allocation.allocationDate}</td><td>{allocation.amount.toLocaleString("en-IN")}</td><td>{allocation.notes ?? "-"}</td></tr>)}</tbody></table> : <p>No credit allocations yet.</p>}{note.status === "POSTED" && note.availableAmount > 0 ? <form action={allocateSalesCreditNoteAction.bind(null, note.id)} className="vercent-toolbar"><select name="targetType" defaultValue="SALES_INVOICE"><option value="SALES_INVOICE">Sales invoice</option><option value="SALES_DEBIT_NOTE">Sales debit note</option></select><input name="targetId" placeholder="Target ID" required /><input name="allocationDate" type="date" defaultValue={new Date().toISOString().slice(0, 10)} /><input name="amount" type="number" step="0.01" max={note.availableAmount} placeholder="Amount" required /><input name="notes" placeholder="Notes" /><button type="submit">Allocate credit</button></form> : null}</section>
      <section className="vercent-panel"><h2>Refunds</h2>{refunds.length ? <table className="vercent-table"><thead><tr><th>Refund</th><th>Status</th><th>Method</th><th>Amount</th></tr></thead><tbody>{refunds.map((refund) => <tr key={refund.id}><td><Link href={`/finance/customer-refunds/${refund.id}`}>{refund.refundNumber}</Link></td><td>{refund.status}</td><td>{refund.paymentMethod}</td><td>{refund.totalAmount.toLocaleString("en-IN")}</td></tr>)}</tbody></table> : <p>No refunds recorded yet.</p>}{note.status === "POSTED" && note.availableAmount > 0 ? <form action={createRefundFromCreditNoteAction.bind(null, note.id)} className="vercent-toolbar"><input name="totalAmount" type="number" step="0.01" max={note.availableAmount} defaultValue={note.availableAmount} /><select name="paymentMethod" defaultValue="BANK_TRANSFER"><option>CASH</option><option>BANK_TRANSFER</option><option>CHEQUE</option><option>UPI</option><option>CARD</option><option>OTHER</option></select><select name="depositAccountId" required>{refundAccounts.map((account) => <option key={account.id} value={account.id}>{account.accountCode} - {account.accountName}</option>)}</select><input name="refundDate" type="date" defaultValue={new Date().toISOString().slice(0, 10)} /><button type="submit">Create Refund</button></form> : null}</section>
    </main>
  );
}
