import Link from "next/link";
import { ModuleHeader } from "../../../components/layout/ModuleHeader";
import { listJournalEntries } from "../../../features/finance/accounting/api";

export default async function JournalEntriesPage({ searchParams }: { searchParams?: Record<string, string | undefined> }) {
  const params = searchParams ?? {};
  const journals = await listJournalEntries(params);
  return (
    <main className="page-shell">
      <ModuleHeader title="Journal Entries" eyebrow="Finance" description="Manual balanced journals. Invoice posting is intentionally not wired yet." actions={<Link className="vercent-button" href="/finance/journal-entries/new">Create journal</Link>} />
      <form className="vercent-toolbar"><input name="search" placeholder="Search journal" defaultValue={params.search ?? ""} /><select name="status" defaultValue={params.status ?? ""}><option value="">All statuses</option><option>DRAFT</option><option>POSTED</option><option>CANCELLED</option></select><input name="dateFrom" type="date" defaultValue={params.dateFrom ?? ""} /><input name="dateTo" type="date" defaultValue={params.dateTo ?? ""} /><button>Filter</button></form>
      <section className="vercent-table-wrap"><table className="vercent-table"><thead><tr><th>Journal</th><th>Date</th><th>Status</th><th>Debit</th><th>Credit</th><th>Narration</th></tr></thead><tbody>{journals.rows.map((journal) => <tr key={journal.id}><td><Link href={`/finance/journal-entries/${journal.id}`}>{journal.journalNumber}</Link></td><td>{journal.journalDate}</td><td>{journal.status}</td><td>{journal.totalDebit.toLocaleString("en-IN")}</td><td>{journal.totalCredit.toLocaleString("en-IN")}</td><td>{journal.narration ?? "-"}</td></tr>)}</tbody></table></section>
    </main>
  );
}
