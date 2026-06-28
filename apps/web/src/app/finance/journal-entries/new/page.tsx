import { ModuleHeader } from "../../../../components/layout/ModuleHeader";
import { createJournalEntryAction } from "../../../../features/finance/accounting/actions";
import { listAccounts, listFiscalYears } from "../../../../features/finance/accounting/api";

export default async function NewJournalEntryPage() {
  const [accounts, years] = await Promise.all([listAccounts({ isActive: "true", pageSize: "200" }), listFiscalYears({ status: "OPEN", pageSize: "50" })]);
  const defaultYear = years.rows.find((year) => year.isDefault) ?? years.rows[0];
  return (
    <main className="page-shell">
      <ModuleHeader title="Create Journal Entry" eyebrow="Finance" description="Create a balanced draft journal entry." />
      <form action={createJournalEntryAction} className="vercent-form">
        <label>Fiscal year<select name="fiscalYearId" defaultValue={defaultYear?.id}>{years.rows.map((year) => <option key={year.id} value={year.id}>{year.name}</option>)}</select></label>
        <label>Journal date<input name="journalDate" type="date" defaultValue={new Date().toISOString().slice(0, 10)} /></label>
        <label>Narration<textarea name="narration" /></label>
        {[0, 1].map((index) => <fieldset key={index}><legend>Line {index + 1}</legend><select name="accountId" required>{accounts.rows.map((account) => <option key={account.id} value={account.id}>{account.accountCode} - {account.accountName}</option>)}</select><input name="debitAmount" type="number" step="0.01" placeholder="Debit" defaultValue={index === 0 ? "100" : "0"} /><input name="creditAmount" type="number" step="0.01" placeholder="Credit" defaultValue={index === 1 ? "100" : "0"} /><input name="lineNarration" placeholder="Line narration" /></fieldset>)}
        <button className="vercent-button" type="submit">Create journal</button>
      </form>
    </main>
  );
}
