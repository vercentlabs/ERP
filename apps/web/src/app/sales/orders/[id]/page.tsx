import Link from "next/link";
import { ModuleHeader } from "../../../../components/layout/ModuleHeader";
import { getSalesOrderStockAvailability } from "../../../../features/inventory/stock/api";
import { createDeliveryNoteFromSalesOrderAction } from "../../../../features/sales/delivery-notes/actions";
import { createInvoiceFromSalesOrderAction } from "../../../../features/sales/invoices/actions";
import { getSalesOrderInvoices } from "../../../../features/sales/invoices/api";
import { changeSalesOrderStatusAction } from "../../../../features/sales/orders/actions";
import { getSalesOrder, getSalesOrderDeliveryNotes, getSalesOrderDeliverySummary, type SalesOrderStatus } from "../../../../features/sales/orders/api";

const nextStatuses: Record<SalesOrderStatus, SalesOrderStatus[]> = {
  DRAFT: ["CONFIRMED", "CANCELLED"],
  CONFIRMED: ["CLOSED", "CANCELLED"],
  CANCELLED: [],
  CLOSED: [],
};

export default async function SalesOrderDetailPage({ params }: { params: { id: string } }) {
  const order = await getSalesOrder(params.id);
  const [availability, deliverySummary, deliveryNotes] = await Promise.all([
    getSalesOrderStockAvailability(params.id),
    getSalesOrderDeliverySummary(params.id),
    getSalesOrderDeliveryNotes(params.id),
  ]);
  const invoices = await getSalesOrderInvoices(params.id);
  const statusAction = changeSalesOrderStatusAction.bind(null, order.id);
  const createDeliveryAction = createDeliveryNoteFromSalesOrderAction.bind(null, order.id);
  const createInvoiceAction = createInvoiceFromSalesOrderAction.bind(null, order.id);
  const terminal = nextStatuses[order.status].length === 0;
  const canCreateDelivery = order.status === "CONFIRMED" && deliverySummary.fulfillmentStatus !== "DELIVERED";

  return (
    <main className="page-shell">
      <ModuleHeader
        title={order.orderNumber}
        eyebrow="Sales Orders"
        description={`Customer order for ${order.customerId}`}
        actions={
          <>
            {!terminal && order.status === "DRAFT" ? <Link className="vercent-button" href={`/sales/orders/${order.id}/edit`}>Edit</Link> : null}
            <Link className="vercent-button secondary" href="/sales/orders">Back</Link>
          </>
        }
      />
      <section className="grid-panel">
        <article className="metric-card"><span>Status</span><strong>{order.status}</strong></article>
        <article className="metric-card"><span>Customer</span><strong><Link href={`/master-data/customers/${order.customerId}`}>{order.customerId}</Link></strong></article>
        <article className="metric-card"><span>Quotation</span><strong>{order.quotationId ? <Link href={`/sales/quotations/${order.quotationId}`}>{order.quotationId}</Link> : "-"}</strong></article>
        <article className="metric-card"><span>Opportunity</span><strong>{order.opportunityId ? <Link href={`/crm/opportunities/${order.opportunityId}`}>{order.opportunityId}</Link> : "-"}</strong></article>
        <article className="metric-card"><span>Order date</span><strong>{order.orderDate}</strong></article>
        <article className="metric-card"><span>Total</span><strong>{order.currency} {order.totalAmount.toLocaleString("en-IN")}</strong></article>
        <article className="metric-card"><span>Fulfillment</span><strong>{deliverySummary.fulfillmentStatus}</strong></article>
      </section>
      <section className="vercent-table-wrap">
        <table className="vercent-table">
          <thead><tr><th>#</th><th>Item</th><th>Description</th><th>Qty</th><th>Unit price</th><th>Discount</th><th>Tax</th><th>Total</th></tr></thead>
          <tbody>
            {order.lines.map((line) => (
              <tr key={line.id}>
                <td>{line.lineNumber}</td>
                <td>{line.itemName}<span>{line.itemId}</span></td>
                <td>{line.description ?? "-"}</td>
                <td>{line.quantity}</td>
                <td>{line.unitPrice.toLocaleString("en-IN")}</td>
                <td>{line.discountAmount.toLocaleString("en-IN")}</td>
                <td>{line.taxAmount.toLocaleString("en-IN")}</td>
                <td>{line.lineTotal.toLocaleString("en-IN")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <section className="grid-panel">
        <article className="metric-card"><span>Subtotal</span><strong>{order.subtotalAmount.toLocaleString("en-IN")}</strong></article>
        <article className="metric-card"><span>Discount</span><strong>{order.discountAmount.toLocaleString("en-IN")}</strong></article>
        <article className="metric-card"><span>Tax</span><strong>{order.taxAmount.toLocaleString("en-IN")}</strong></article>
        <article className="metric-card"><span>Total</span><strong>{order.totalAmount.toLocaleString("en-IN")}</strong></article>
      </section>
      <section className="vercent-panel">
        <h2>Status actions</h2>
        <form action={statusAction} className="vercent-toolbar">
          <select name="status" required>
            <option value="">Choose status</option>
            {nextStatuses[order.status].map((status) => <option key={status} value={status}>{status}</option>)}
          </select>
          <button type="submit" disabled={terminal}>Change status</button>
        </form>
      </section>
      <section className="vercent-panel">
        <h2>Linked invoices</h2>
        <table className="vercent-table">
          <thead><tr><th>Invoice</th><th>Status</th><th>Payment</th><th>Total</th><th>Due</th></tr></thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr key={invoice.id}>
                <td><Link href={`/sales/invoices/${invoice.id}`}>{invoice.invoiceNumber}</Link></td>
                <td>{invoice.status}</td>
                <td>{invoice.paymentStatus}</td>
                <td>{invoice.totalAmount.toLocaleString("en-IN")}</td>
                <td>{invoice.amountDue.toLocaleString("en-IN")}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {order.status === "CONFIRMED" || order.status === "CLOSED" ? (
          <form action={createInvoiceAction} className="vercent-toolbar">
            <input name="invoiceDate" type="date" />
            <input name="dueDate" type="date" />
            <input name="notes" placeholder="Invoice notes" />
            <button type="submit">Create Service Invoice</button>
          </form>
        ) : null}
        <p>For delivered stock items, create invoices from posted delivery notes.</p>
      </section>
      <section className="vercent-panel">
        <h2>Delivery summary</h2>
        <table className="vercent-table">
          <thead><tr><th>Line</th><th>Item</th><th>Ordered</th><th>Delivered</th><th>Remaining</th></tr></thead>
          <tbody>
            {deliverySummary.lines.map((line) => (
              <tr key={line.salesOrderLineId}>
                <td>{line.lineNumber}</td>
                <td>{line.itemName}<span>{line.itemId}</span></td>
                <td>{line.orderedQuantity}</td>
                <td>{line.deliveredQuantity}</td>
                <td>{line.remainingQuantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {canCreateDelivery ? (
          <form action={createDeliveryAction} className="vercent-toolbar">
            <input name="deliveryDate" type="date" />
            <input name="warehouseId" placeholder="Default warehouse ID for stock items" />
            <input name="notes" placeholder="Delivery notes" />
            <button type="submit">Create Delivery Note</button>
          </form>
        ) : null}
      </section>
      <section className="vercent-panel">
        <h2>Linked delivery notes</h2>
        <table className="vercent-table">
          <thead><tr><th>Delivery note</th><th>Status</th><th>Delivery date</th><th>Posting date</th></tr></thead>
          <tbody>
            {deliveryNotes.map((note) => (
              <tr key={note.id}>
                <td><Link href={`/sales/delivery-notes/${note.id}`}>{note.deliveryNoteNumber}</Link></td>
                <td>{note.status}</td>
                <td>{note.deliveryDate}</td>
                <td>{note.postingDate ?? "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <section className="vercent-panel">
        <h2>Stock availability</h2>
        <table className="vercent-table">
          <thead><tr><th>Item</th><th>Ordered</th><th>Available</th><th>Status</th></tr></thead>
          <tbody>
            {availability.map((line) => (
              <tr key={line.itemId}>
                <td>{line.itemName}<span>{line.itemId}</span></td>
                <td>{line.orderedQuantity}</td>
                <td>{line.totalAvailableQuantity}</td>
                <td>{line.availabilityStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p>This check is read-only. It does not reserve, issue, or deduct stock.</p>
      </section>
      <section className="vercent-panel">
        <h2>Fulfillment notice</h2>
        <p>Inventory reservation, delivery notes, invoices, payments, and accounting posting are not implemented in this prompt.</p>
      </section>
      <section className="vercent-panel">
        <h2>Print/download</h2>
        <p>PDF generation is not wired yet. This page is the printable sales order preview placeholder.</p>
      </section>
    </main>
  );
}
