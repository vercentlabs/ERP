import { ModuleHeader } from "../../../../components/layout/ModuleHeader";
import { createAccountAction } from "../../../../features/finance/accounting/actions";

export default function NewAccountPage() {
  return (
    <main className="page-shell">
      <ModuleHeader title="Create Account" eyebrow="Chart of accounts" description="Create a ledger account for manual journals." />
      <form action={createAccountAction} className="vercent-form">
        <label>Account code<input name="accountCode" required /></label>
        <label>Account name<input name="accountName" required /></label>
        <label>Type<select name="accountType" defaultValue="ASSET"><option>ASSET</option><option>LIABILITY</option><option>EQUITY</option><option>INCOME</option><option>EXPENSE</option></select></label>
        <label>Normal balance<select name="normalBalance" defaultValue="DEBIT"><option>DEBIT</option><option>CREDIT</option></select></label>
        <label>Opening balance<input name="openingBalance" type="number" step="0.01" defaultValue="0" /></label>
        <label><input name="isActive" type="checkbox" defaultChecked /> Active</label>
        <button className="vercent-button" type="submit">Create account</button>
      </form>
    </main>
  );
}
