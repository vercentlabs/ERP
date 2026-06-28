import { ModuleHeader } from "../../../../../components/layout/ModuleHeader";
import { getBankAccount } from "../../../../../features/finance/banking/api";
import { updateBankAccountAction } from "../../../../../features/finance/banking/actions";

export default async function EditBankAccountPage({ params }: { params: { id: string } }) {
  const account = await getBankAccount(params.id);
  return (
    <main className="page-shell">
      <ModuleHeader title={`Edit ${account.accountName}`} eyebrow="Bank/Cash Account" />
      <form className="vercent-form" action={updateBankAccountAction.bind(null, account.id)}>
        <label>Account name<input name="accountName" defaultValue={account.accountName} required /></label>
        <label>Bank name<input name="bankName" defaultValue={account.bankName ?? ""} /></label>
        <label>Type<select name="accountType" defaultValue={account.accountType}><option>CASH</option><option>CURRENT</option><option>SAVINGS</option><option>OD</option><option>OTHER</option></select></label>
        <label>Currency<input name="currency" defaultValue={account.currency} /></label>
        <label>Opening balance<input name="openingBalance" type="number" step="0.01" defaultValue={account.openingBalance} /></label>
        <label>Status<select name="status" defaultValue={account.status}><option>ACTIVE</option><option>INACTIVE</option></select></label>
        <label><input name="isDefault" type="checkbox" defaultChecked={account.isDefault} /> Default account</label>
        <label>Notes<textarea name="notes" defaultValue={account.notes ?? ""} /></label>
        <button className="vercent-button" type="submit">Save changes</button>
      </form>
    </main>
  );
}
