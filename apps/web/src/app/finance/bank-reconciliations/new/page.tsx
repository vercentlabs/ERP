import { ModuleHeader } from "../../../../components/layout/ModuleHeader";
import { listBankAccounts } from "../../../../features/finance/banking/api";
import { createBankReconciliationAction } from "../../../../features/finance/banking/actions";

export default async function NewBankReconciliationPage() {
  const bankAccounts = await listBankAccounts({ status: "ACTIVE", pageSize: "200" });
  return (
    <main className="page-shell">
      <ModuleHeader title="Create Bank Reconciliation" eyebrow="Finance" description="Start a draft reconciliation and enter statement lines manually." />
      <form className="vercent-form" action={createBankReconciliationAction}>
        <label>Bank/cash account<select name="bankAccountId" required>{bankAccounts.rows.map((account) => <option key={account.id} value={account.id}>{account.accountName}</option>)}</select></label>
        <label>Statement start<input name="statementStartDate" type="date" required /></label>
        <label>Statement end<input name="statementEndDate" type="date" required /></label>
        <label>Opening statement balance<input name="openingStatementBalance" type="number" step="0.01" defaultValue="0" /></label>
        <label>Closing statement balance<input name="closingStatementBalance" type="number" step="0.01" required /></label>
        <label>Notes<textarea name="notes" /></label>
        <section className="vercent-table-wrap">
          <table className="vercent-table"><thead><tr><th>Date</th><th>Description</th><th>Reference</th><th>Debit</th><th>Credit</th></tr></thead><tbody>{[0, 1, 2].map((row) => <tr key={row}><td><input name="transactionDate" type="date" /></td><td><input name="description" /></td><td><input name="referenceNumber" /></td><td><input name="debitAmount" type="number" step="0.01" defaultValue="0" /></td><td><input name="creditAmount" type="number" step="0.01" defaultValue="0" /></td></tr>)}</tbody></table>
        </section>
        <button className="vercent-button" type="submit">Create reconciliation</button>
      </form>
    </main>
  );
}
