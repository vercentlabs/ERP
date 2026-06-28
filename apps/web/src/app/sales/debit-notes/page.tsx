import Link from "next/link";
import { ModuleHeader } from "../../../components/layout/ModuleHeader";
import { getSalesDebitNoteStats, listSalesDebitNotes } from "../../../features/sales/debit-notes/api";

export default async function SalesDebitNotesPage({ searchParams }: { searchParams?: Record<string, string> }) {
  const params = searchParams ?? {};
  const [notes, stats] = await Promise.all([listSalesDebitNotes(params), getSalesDebitNoteStats(params)]);
  return (
    <main className="page-shell">
      <ModuleHeader title="Sales Debit Notes" eyebrow="Sales" description="Add customer receivables with explicit accounting journals." actions={<Link className="vercent-button" href="/sales/debit-notes/new">Create debit note</Link>} />
      <section className="metric-grid">
        <div className="metric-card"><span>Draft value</span><strong>{stats.draftValue}</strong></div>
        <div className="metric-card"><span>Posted value</span><strong>{stats.postedValue}</strong></div>
        <div className="metric-card"><span>Cancelled value</span><strong>{stats.cancelledValue}</strong></div>
      </section>
      <form className="toolbar">
        <input name="search" placeholder="Search debit notes" defaultValue={params.search ?? ""} />
        <select name="status" defaultValue={params.status ?? ""}><option value="">All statuses</option><option>DRAFT</option><option>POSTED</option><option>CANCELLED</option></select>
        <button className="vercent-button secondary" type="submit">Filter</button>
      </form>
      <table className="data-table">
        <thead><tr><th>Number</th><th>Invoice</th><th>Status</th><th>Accounting</th><th>Date</th><th>Total</th><th /></tr></thead>
        <tbody>{notes.rows.map((note) => <tr key={note.id}><td>{note.debitNoteNumber}</td><td>{note.salesInvoiceId}</td><td>{note.status}</td><td>{note.accountingStatus}</td><td>{note.debitNoteDate}</td><td>{note.totalAmount}</td><td><Link href={`/sales/debit-notes/${note.id}`}>View</Link></td></tr>)}</tbody>
      </table>
    </main>
  );
}
