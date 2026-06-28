import { ModuleHeader } from "../../../../../components/layout/ModuleHeader";
import { getBankReconciliation } from "../../../../../features/finance/banking/api";
import { updateBankReconciliationAction } from "../../../../../features/finance/banking/actions";

export default async function EditBankReconciliationPage({ params }: { params: { id: string } }) {
  const reconciliation = await getBankReconciliation(params.id);
  const editable = reconciliation.status === "DRAFT";
  return (
    <main className="page-shell">
      <ModuleHeader title={`Edit ${reconciliation.reconciliationNumber}`} eyebrow="Bank Reconciliation" description={editable ? "Draft reconciliations can be edited." : "Completed and cancelled reconciliations are immutable."} />
      <form className="vercent-form" action={updateBankReconciliationAction.bind(null, reconciliation.id)}>
        <fieldset disabled={!editable}>
          <label>Statement start<input name="statementStartDate" type="date" defaultValue={reconciliation.statementStartDate} required /></label>
          <label>Statement end<input name="statementEndDate" type="date" defaultValue={reconciliation.statementEndDate} required /></label>
          <label>Opening statement balance<input name="openingStatementBalance" type="number" step="0.01" defaultValue={reconciliation.openingStatementBalance} /></label>
          <label>Closing statement balance<input name="closingStatementBalance" type="number" step="0.01" defaultValue={reconciliation.closingStatementBalance} required /></label>
          <label>Notes<textarea name="notes" defaultValue={reconciliation.notes ?? ""} /></label>
          <section className="vercent-table-wrap"><table className="vercent-table"><thead><tr><th>Date</th><th>Description</th><th>Reference</th><th>Debit</th><th>Credit</th></tr></thead><tbody>{reconciliation.lines.concat([{ id: "blank-1", transactionDate: "", description: "", referenceNumber: "", debitAmount: 0, creditAmount: 0, amount: 0 }, { id: "blank-2", transactionDate: "", description: "", referenceNumber: "", debitAmount: 0, creditAmount: 0, amount: 0 }]).map((line) => <tr key={line.id}><td><input name="transactionDate" type="date" defaultValue={line.transactionDate} /></td><td><input name="description" defaultValue={line.description} /></td><td><input name="referenceNumber" defaultValue={line.referenceNumber ?? ""} /></td><td><input name="debitAmount" type="number" step="0.01" defaultValue={line.debitAmount} /></td><td><input name="creditAmount" type="number" step="0.01" defaultValue={line.creditAmount} /></td></tr>)}</tbody></table></section>
        </fieldset>
        {editable ? <button className="vercent-button" type="submit">Save changes</button> : null}
      </form>
    </main>
  );
}
