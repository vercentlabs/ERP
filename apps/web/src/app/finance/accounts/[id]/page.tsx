import Link from "next/link";
import { ModuleHeader } from "../../../../components/layout/ModuleHeader";
import { getAccount } from "../../../../features/finance/accounting/api";

export default async function AccountDetailPage({ params }: { params: { id: string } }) {
  const account = await getAccount(params.id);
  return (
    <main className="page-shell">
      <ModuleHeader title={account.accountName} eyebrow={account.accountCode} description="Ledger account details." actions={<Link className="vercent-button" href={`/finance/accounts/${account.id}/edit`}>Edit</Link>} />
      <section className="detail-grid"><p><strong>Type</strong><span>{account.accountType}</span></p><p><strong>Normal balance</strong><span>{account.normalBalance}</span></p><p><strong>Opening balance</strong><span>{account.openingBalance.toLocaleString("en-IN")}</span></p><p><strong>Status</strong><span>{account.isActive ? "Active" : "Inactive"}</span></p></section>
    </main>
  );
}
