import Link from "next/link";
import { ModuleHeader } from "../../../components/layout/ModuleHeader";
import { getSalesCreditNoteStats, listSalesCreditNotes } from "../../../features/sales/credit-notes/api";

export default async function SalesCreditNotesPage({ searchParams }: { searchParams?: Record<string, string> }) {
  const params = searchParams ?? {};
  const [notes, stats] = await Promise.all([listSalesCreditNotes(params), getSalesCreditNoteStats(params)]);
  return (
    <main className="page-shell">
      <ModuleHeader title="Sales Credit Notes" eyebrow="Sales" description="Reduce customer receivables without deleting posted invoices or journals." actions={<Link className="vercent-button" href="/sales/credit-notes/new">Create credit note</Link>} />
      <section className="metric-grid">
        <div className="metric-card"><span>Draft value</span><strong>{stats.draftValue}</strong></div>
        <div className="metric-card"><span>Posted value</span><strong>{stats.postedValue}</strong></div>
        <div className="metric-card"><span>Cancelled value</span><strong>{stats.cancelledValue}</strong></div>
      </section>
      <form className="toolbar">
        <input name="search" placeholder="Search credit notes" defaultValue={params.search ?? ""} />
        <select name="status" defaultValue={params.status ?? ""}><option value="">All statuses</option><option>DRAFT</option><option>POSTED</option><option>CANCELLED</option></select>
        <button className="vercent-button secondary" type="submit">Filter</button>
      </form>
      <table className="data-table">
        <thead><tr><th>Number</th><th>Invoice</th><th>Status</th><th>Date</th><th>Total</th><th /></tr></thead>
        <tbody>{notes.rows.map((note) => <tr key={note.id}><td>{note.creditNoteNumber}</td><td>{note.salesInvoiceId}</td><td>{note.status}</td><td>{note.creditNoteDate}</td><td>{note.currency} {note.totalAmount}</td><td><Link href={`/sales/credit-notes/${note.id}`}>View</Link></td></tr>)}</tbody>
      </table>
    </main>
  );
}
