import { ModuleHeader } from "../../../../../components/layout/ModuleHeader";
import { updateJournalEntryAction } from "../../../../../features/finance/accounting/actions";
import { getJournalEntry, listAccounts, listFiscalYears } from "../../../../../features/finance/accounting/api";

export default async function EditJournalEntryPage({ params }: { params: { id: string } }) {
  const [journal, accounts, years] = await Promise.all([getJournalEntry(params.id), listAccounts({ isActive: "true", pageSize: "200" }), listFiscalYears({ status: "OPEN", pageSize: "50" })]);
  if (journal.status !== "DRAFT") return <main className="page-shell"><ModuleHeader title="Journal locked" eyebrow={journal.status} description="Posted and cancelled journal entries cannot be edited." /></main>;
  const update = updateJournalEntryAction.bind(null, journal.id);
  return (
    <main className="page-shell">
      <ModuleHeader title={`Edit ${journal.journalNumber}`} eyebrow="Finance" description="Only draft journal entries can be edited." />
      <form action={update} className="vercent-form">
        <label>Fiscal year<select name="fiscalYearId" defaultValue={journal.fiscalYearId}>{years.rows.map((year) => <option key={year.id} value={year.id}>{year.name}</option>)}</select></label>
        <label>Journal date<input name="journalDate" type="date" defaultValue={journal.journalDate} /></label>
        <label>Narration<textarea name="narration" defaultValue={journal.narration ?? ""} /></label>
        {journal.lines.map((line) => <fieldset key={line.id}><legend>Line {line.lineNumber}</legend><select name="accountId" required defaultValue={line.accountId}>{accounts.rows.map((account) => <option key={account.id} value={account.id}>{account.accountCode} - {account.accountName}</option>)}</select><input name="debitAmount" type="number" step="0.01" defaultValue={line.debitAmount} /><input name="creditAmount" type="number" step="0.01" defaultValue={line.creditAmount} /><input name="lineNarration" defaultValue={line.narration ?? ""} /></fieldset>)}
        <button className="vercent-button" type="submit">Save journal</button>
      </form>
    </main>
  );
}
