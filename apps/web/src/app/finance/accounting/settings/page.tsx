import { ModuleHeader } from "../../../../components/layout/ModuleHeader";
import { updateAccountingSettingsAction } from "../../../../features/finance/accounting/actions";
import { getAccountingSettings, listAccounts } from "../../../../features/finance/accounting/api";

export default async function AccountingSettingsPage() {
  const [settings, accounts] = await Promise.all([getAccountingSettings(), listAccounts({ isActive: "true", pageSize: "200" })]);
  return (
    <main className="page-shell">
      <ModuleHeader title="Accounting Settings" eyebrow="Finance" description="Map sales invoice posting to ledger accounts. Posting remains an explicit invoice action." />
      <form action={updateAccountingSettingsAction} className="vercent-form">
        <label>Accounts Receivable<select name="accountsReceivableAccountId" required defaultValue={settings?.accountsReceivableAccountId ?? ""}><option value="">Select account</option>{accounts.rows.map((account) => <option key={account.id} value={account.id}>{account.accountCode} - {account.accountName}</option>)}</select></label>
        <label>Sales Income<select name="salesIncomeAccountId" required defaultValue={settings?.salesIncomeAccountId ?? ""}><option value="">Select account</option>{accounts.rows.map((account) => <option key={account.id} value={account.id}>{account.accountCode} - {account.accountName}</option>)}</select></label>
        <label>Sales Returns / Adjustments<select name="salesReturnsAccountId" defaultValue={settings?.salesReturnsAccountId ?? ""}><option value="">Select account before posting credit notes</option>{accounts.rows.map((account) => <option key={account.id} value={account.id}>{account.accountCode} - {account.accountName}</option>)}</select></label>
        <label>Additional Charges Income<select name="additionalChargesIncomeAccountId" defaultValue={settings?.additionalChargesIncomeAccountId ?? ""}><option value="">Select account before posting debit notes</option>{accounts.rows.map((account) => <option key={account.id} value={account.id}>{account.accountCode} - {account.accountName}</option>)}</select></label>
        <label>Sales Tax Payable<select name="salesTaxPayableAccountId" defaultValue={settings?.salesTaxPayableAccountId ?? ""}><option value="">None</option>{accounts.rows.map((account) => <option key={account.id} value={account.id}>{account.accountCode} - {account.accountName}</option>)}</select></label>
        <label>Rounding Adjustment<select name="roundingAdjustmentAccountId" defaultValue={settings?.roundingAdjustmentAccountId ?? ""}><option value="">None</option>{accounts.rows.map((account) => <option key={account.id} value={account.id}>{account.accountCode} - {account.accountName}</option>)}</select></label>
        <button className="vercent-button" type="submit">Save settings</button>
      </form>
    </main>
  );
}
