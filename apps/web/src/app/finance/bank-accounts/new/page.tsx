import { ModuleHeader } from "../../../../components/layout/ModuleHeader";
import { listAccounts } from "../../../../features/finance/accounting/api";
import { createBankAccountAction } from "../../../../features/finance/banking/actions";

export default async function NewBankAccountPage() {
  const accounts = await listAccounts({ type: "ASSET", isActive: "true", pageSize: "200" });
  return (
    <main className="page-shell">
      <ModuleHeader title="Create Bank/Cash Account" eyebrow="Finance" description="Link this record to an active chart-of-account entry marked as cash or bank." />
      <form className="vercent-form" action={createBankAccountAction}>
        <label>Linked finance account<select name="accountId" required>{accounts.rows.filter((account) => account.isCashAccount || account.isBankAccount).map((account) => <option key={account.id} value={account.id}>{account.accountCode} - {account.accountName}</option>)}</select></label>
        <label>Account name<input name="accountName" required /></label>
        <label>Bank name<input name="bankName" /></label>
        <label>Type<select name="accountType" defaultValue="CURRENT"><option>CASH</option><option>CURRENT</option><option>SAVINGS</option><option>OD</option><option>OTHER</option></select></label>
        <label>Currency<input name="currency" defaultValue="INR" /></label>
        <label>Opening balance<input name="openingBalance" type="number" step="0.01" defaultValue="0" /></label>
        <label>Status<select name="status" defaultValue="ACTIVE"><option>ACTIVE</option><option>INACTIVE</option></select></label>
        <label><input name="isDefault" type="checkbox" /> Default account</label>
        <label>Notes<textarea name="notes" /></label>
        <button className="vercent-button" type="submit">Create account</button>
      </form>
    </main>
  );
}
