import Link from "next/link";
import { ModuleHeader } from "../../../../components/layout/ModuleHeader";
import { cancelDeliveryNoteAction, postDeliveryNoteAction } from "../../../../features/sales/delivery-notes/actions";
import { getDeliveryNote } from "../../../../features/sales/delivery-notes/api";
import { createInvoiceFromDeliveryNoteAction } from "../../../../features/sales/invoices/actions";
import { getDeliveryNoteInvoice } from "../../../../features/sales/invoices/api";

export default async function DeliveryNoteDetailPage({ params }: { params: { id: string } }) {
  const note = await getDeliveryNote(params.id);
  const invoice = await getDeliveryNoteInvoice(params.id);
  const postAction = postDeliveryNoteAction.bind(null, note.id);
  const cancelAction = cancelDeliveryNoteAction.bind(null, note.id);
  const createInvoiceAction = createInvoiceFromDeliveryNoteAction.bind(null, note.id);

  return (
    <main className="page-shell">
      <ModuleHeader
        title={note.deliveryNoteNumber}
        eyebrow="Delivery Notes"
        description={`Delivery against sales order ${note.salesOrderId}`}
        actions={
          <>
            {note.status === "DRAFT" ? <Link className="vercent-button" href={`/sales/delivery-notes/${note.id}/edit`}>Edit</Link> : null}
            <Link className="vercent-button secondary" href="/sales/delivery-notes">Back</Link>
          </>
        }
      />
      <section className="grid-panel">
        <article className="metric-card"><span>Status</span><strong>{note.status}</strong></article>
        <article className="metric-card"><span>Sales order</span><strong><Link href={`/sales/orders/${note.salesOrderId}`}>{note.salesOrderId}</Link></strong></article>
        <article className="metric-card"><span>Customer</span><strong>{note.customerId}</strong></article>
        <article className="metric-card"><span>Delivery date</span><strong>{note.deliveryDate}</strong></article>
        <article className="metric-card"><span>Posting date</span><strong>{note.postingDate ?? "-"}</strong></article>
        <article className="metric-card"><span>Warehouse</span><strong>{note.warehouseId ?? "-"}</strong></article>
      </section>
      <section className="vercent-table-wrap">
        <table className="vercent-table">
          <thead><tr><th>#</th><th>Item</th><th>Ordered</th><th>Previously delivered</th><th>This delivery</th><th>Remaining</th><th>Warehouse</th><th>Stock issue</th></tr></thead>
          <tbody>
            {note.lines.map((line) => (
              <tr key={line.id}>
                <td>{line.lineNumber}</td>
                <td>{line.itemName}<span>{line.itemId}</span></td>
                <td>{line.orderedQuantity}</td>
                <td>{line.previouslyDeliveredQuantity}</td>
                <td>{line.quantity}</td>
                <td>{line.remainingQuantityAfterDelivery}</td>
                <td>{line.warehouseId ?? "-"}</td>
                <td>{line.isStockItem ? line.stockLedgerEntryId ?? "Pending post" : "Non-stock"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      {note.status === "DRAFT" ? (
        <section className="vercent-panel">
          <h2>Actions</h2>
          <form action={postAction} className="vercent-toolbar">
            <input name="postingDate" type="date" />
            <button type="submit">Post delivery</button>
          </form>
          <form action={cancelAction}><button type="submit">Cancel draft</button></form>
        </section>
      ) : null}
      {note.status === "POSTED" ? (
        <section className="vercent-panel">
          <h2>Invoice</h2>
          {invoice ? (
            <p>Linked invoice: <Link href={`/sales/invoices/${invoice.id}`}>{invoice.invoiceNumber}</Link></p>
          ) : (
            <form action={createInvoiceAction} className="vercent-toolbar">
              <input name="invoiceDate" type="date" />
              <input name="dueDate" type="date" />
              <input name="notes" placeholder="Invoice notes" />
              <button type="submit">Create Invoice</button>
            </form>
          )}
        </section>
      ) : null}
      <section className="vercent-panel">
        <h2>Print/download</h2>
        <p>PDF generation is not wired yet. This page is the printable delivery note placeholder.</p>
      </section>
    </main>
  );
}
