import Link from "next/link";
import { ModuleHeader } from "../../../../components/layout/ModuleHeader";
import { convertQuotationToSalesOrderAction } from "../../../../features/sales/orders/actions";
import { getLinkedSalesOrder } from "../../../../features/sales/orders/api";
import { changeQuotationStatusAction } from "../../../../features/sales/quotations/actions";
import { getQuotation, type QuotationStatus } from "../../../../features/sales/quotations/api";

const nextStatuses: Record<QuotationStatus, QuotationStatus[]> = {
  DRAFT: ["SENT", "CANCELLED"],
  SENT: ["ACCEPTED", "REJECTED", "EXPIRED", "CANCELLED"],
  ACCEPTED: [],
  REJECTED: [],
  EXPIRED: [],
  CANCELLED: [],
};

export default async function QuotationDetailPage({ params }: { params: { id: string } }) {
  const quotation = await getQuotation(params.id);
  const linkedOrder = quotation.status === "ACCEPTED" ? await getLinkedSalesOrder(quotation.id) : null;
  const statusAction = changeQuotationStatusAction.bind(null, quotation.id);
  const convertAction = convertQuotationToSalesOrderAction.bind(null, quotation.id);
  const terminal = nextStatuses[quotation.status].length === 0;

  return (
    <main className="page-shell">
      <ModuleHeader
        title={quotation.quotationNumber}
        eyebrow="Sales Quotations"
        description={`Quotation for customer ${quotation.customerId}`}
        actions={
          <>
            {!terminal ? <Link className="vercent-button" href={`/sales/quotations/${quotation.id}/edit`}>Edit</Link> : null}
            <Link className="vercent-button secondary" href="/sales/quotations">Back</Link>
          </>
        }
      />

      <section className="grid-panel">
        <article className="metric-card"><span>Status</span><strong>{quotation.status}</strong></article>
        <article className="metric-card"><span>Customer</span><strong><Link href={`/master-data/customers/${quotation.customerId}`}>{quotation.customerId}</Link></strong></article>
        <article className="metric-card"><span>Opportunity</span><strong>{quotation.opportunityId ? <Link href={`/crm/opportunities/${quotation.opportunityId}`}>{quotation.opportunityId}</Link> : "-"}</strong></article>
        <article className="metric-card"><span>Quote date</span><strong>{quotation.quoteDate}</strong></article>
        <article className="metric-card"><span>Valid until</span><strong>{quotation.validUntil}</strong></article>
        <article className="metric-card"><span>Total</span><strong>{quotation.currency} {quotation.totalAmount.toLocaleString("en-IN")}</strong></article>
      </section>

      <section className="vercent-table-wrap">
        <table className="vercent-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Item</th>
              <th>Description</th>
              <th>Qty</th>
              <th>Unit price</th>
              <th>Discount</th>
              <th>Tax</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {quotation.lines.map((line) => (
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
        <article className="metric-card"><span>Subtotal</span><strong>{quotation.subtotalAmount.toLocaleString("en-IN")}</strong></article>
        <article className="metric-card"><span>Discount</span><strong>{quotation.discountAmount.toLocaleString("en-IN")}</strong></article>
        <article className="metric-card"><span>Tax</span><strong>{quotation.taxAmount.toLocaleString("en-IN")}</strong></article>
        <article className="metric-card"><span>Total</span><strong>{quotation.totalAmount.toLocaleString("en-IN")}</strong></article>
      </section>

      <section className="vercent-panel">
        <h2>Status actions</h2>
        <form action={statusAction} className="vercent-toolbar">
          <select name="status" required>
            <option value="">Choose status</option>
            {nextStatuses[quotation.status].map((status) => <option key={status} value={status}>{status}</option>)}
          </select>
          <input name="rejectionReason" placeholder="Rejection reason" />
          <button type="submit" disabled={terminal}>Change status</button>
        </form>
      </section>

      {quotation.status === "ACCEPTED" ? (
        <section className="vercent-panel">
          <h2>Sales order</h2>
          {linkedOrder ? (
            <p>Linked sales order: <Link href={`/sales/orders/${linkedOrder.id}`}>{linkedOrder.orderNumber}</Link></p>
          ) : (
            <form action={convertAction} className="vercent-toolbar">
              <input name="expectedDeliveryDate" type="date" aria-label="Expected delivery date" />
              <input name="notes" placeholder="Order notes" />
              <button type="submit">Create Sales Order</button>
            </form>
          )}
        </section>
      ) : null}

      <section className="vercent-panel">
        <h2>Print/download</h2>
        <p>PDF generation is not wired yet. This page is the printable quotation preview placeholder.</p>
      </section>
    </main>
  );
}
