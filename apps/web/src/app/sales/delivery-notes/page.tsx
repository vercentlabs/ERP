import Link from "next/link";
import { ModuleHeader } from "../../../components/layout/ModuleHeader";
import { getDeliveryNoteStats, listDeliveryNotes } from "../../../features/sales/delivery-notes/api";

export default async function SalesDeliveryNotesPage({ searchParams }: { searchParams?: Record<string, string | undefined> }) {
  const params = searchParams ?? {};
  const [notes, stats] = await Promise.all([listDeliveryNotes(params), getDeliveryNoteStats(params)]);

  return (
    <main className="page-shell">
      <ModuleHeader
        title="Sales Delivery Notes"
        eyebrow="Sales fulfillment"
        description="Create, post, and track deliveries against confirmed sales orders."
        actions={<Link className="vercent-button" href="/sales/delivery-notes/new">Create delivery note</Link>}
      />
      <section className="grid-panel">
        <article className="metric-card"><span>Draft</span><strong>{stats.draftCount}</strong></article>
        <article className="metric-card"><span>Posted</span><strong>{stats.postedCount}</strong></article>
        <article className="metric-card"><span>Cancelled</span><strong>{stats.cancelledCount}</strong></article>
        <article className="metric-card"><span>Delivered orders</span><strong>{stats.deliveredOrdersCount}</strong></article>
      </section>
      <form className="vercent-toolbar">
        <input name="search" placeholder="Search delivery notes" defaultValue={params.search ?? ""} />
        <select name="status" defaultValue={params.status ?? ""}>
          <option value="">All statuses</option>
          <option value="DRAFT">Draft</option>
          <option value="POSTED">Posted</option>
          <option value="CANCELLED">Cancelled</option>
        </select>
        <input name="customerId" placeholder="Customer ID" defaultValue={params.customerId ?? ""} />
        <input name="warehouseId" placeholder="Warehouse ID" defaultValue={params.warehouseId ?? ""} />
        <button type="submit">Filter</button>
      </form>
      <section className="vercent-table-wrap">
        <table className="vercent-table">
          <thead><tr><th>Delivery note</th><th>Order</th><th>Customer</th><th>Status</th><th>Delivery date</th><th>Posted</th><th>Warehouse</th></tr></thead>
          <tbody>
            {notes.rows.map((note) => (
              <tr key={note.id}>
                <td><Link href={`/sales/delivery-notes/${note.id}`}>{note.deliveryNoteNumber}</Link></td>
                <td><Link href={`/sales/orders/${note.salesOrderId}`}>{note.salesOrderId}</Link></td>
                <td>{note.customerId}</td>
                <td>{note.status}</td>
                <td>{note.deliveryDate}</td>
                <td>{note.postingDate ?? "-"}</td>
                <td>{note.warehouseId ?? "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}
