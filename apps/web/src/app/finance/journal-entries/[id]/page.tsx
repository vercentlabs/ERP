import Link from "next/link";
import { ModuleHeader } from "../../../../components/layout/ModuleHeader";
import { cancelJournalEntryAction, postJournalEntryAction } from "../../../../features/finance/accounting/actions";
import { getJournalEntry } from "../../../../features/finance/accounting/api";

export default async function JournalEntryDetailPage({ params }: { params: { id: string } }) {
  const journal = await getJournalEntry(params.id);
  return (
    <main className="page-shell">
      <ModuleHeader title={journal.journalNumber} eyebrow={journal.status} description="Posted journals are immutable. Posted cancellation reversal is not implemented yet." actions={journal.status === "DRAFT" ? <><Link className="vercent-button" href={`/finance/journal-entries/${journal.id}/edit`}>Edit</Link><form action={postJournalEntryAction.bind(null, journal.id)}><button className="vercent-button" type="submit">Post</button></form><form action={cancelJournalEntryAction.bind(null, journal.id)}><button type="submit">Cancel draft</button></form></> : undefined} />
      <section className="detail-grid"><p><strong>Date</strong><span>{journal.journalDate}</span></p><p><strong>Total debit</strong><span>{journal.totalDebit.toLocaleString("en-IN")}</span></p><p><strong>Total credit</strong><span>{journal.totalCredit.toLocaleString("en-IN")}</span></p><p><strong>Narration</strong><span>{journal.narration ?? "-"}</span></p></section>
      <section className="vercent-table-wrap"><table className="vercent-table"><thead><tr><th>Line</th><th>Account</th><th>Debit</th><th>Credit</th><th>Narration</th></tr></thead><tbody>{journal.lines.map((line) => <tr key={line.id}><td>{line.lineNumber}</td><td>{line.accountId}</td><td>{line.debitAmount.toLocaleString("en-IN")}</td><td>{line.creditAmount.toLocaleString("en-IN")}</td><td>{line.narration ?? "-"}</td></tr>)}</tbody></table></section>
    </main>
  );
}
