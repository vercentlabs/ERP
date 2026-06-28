import { ModuleHeader } from "../../../../../components/layout/ModuleHeader";
import { updateAccountAction } from "../../../../../features/finance/accounting/actions";
import { getAccount } from "../../../../../features/finance/accounting/api";

export default async function EditAccountPage({ params }: { params: { id: string } }) {
  const account = await getAccount(params.id);
  const update = updateAccountAction.bind(null, account.id);
  return (
    <main className="page-shell">
      <ModuleHeader title={`Edit ${account.accountCode}`} eyebrow="Chart of accounts" description="Update account settings used by journals." />
      <form action={update} className="vercent-form">
        <label>Account name<input name="accountName" required defaultValue={account.accountName} /></label>
        <label>Type<select name="accountType" defaultValue={account.accountType}><option>ASSET</option><option>LIABILITY</option><option>EQUITY</option><option>INCOME</option><option>EXPENSE</option></select></label>
        <label>Normal balance<select name="normalBalance" defaultValue={account.normalBalance}><option>DEBIT</option><option>CREDIT</option></select></label>
        <label>Opening balance<input name="openingBalance" type="number" step="0.01" defaultValue={account.openingBalance} /></label>
        <label><input name="isActive" type="checkbox" defaultChecked={account.isActive} /> Active</label>
        <button className="vercent-button" type="submit">Save account</button>
      </form>
    </main>
  );
}
