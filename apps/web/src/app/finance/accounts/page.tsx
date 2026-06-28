import Link from "next/link";
import { ModuleHeader } from "../../../components/layout/ModuleHeader";
import { listAccounts } from "../../../features/finance/accounting/api";

export default async function AccountsPage({ searchParams }: { searchParams?: Record<string, string | undefined> }) {
  const params = searchParams ?? {};
  const accounts = await listAccounts(params);
  return (
    <main className="page-shell">
      <ModuleHeader title="Chart of Accounts" eyebrow="Finance" description="Maintain account codes used by manual journals. Sales invoices do not post accounting yet." actions={<Link className="vercent-button" href="/finance/accounts/new">Create account</Link>} />
      <form className="vercent-toolbar">
        <input name="search" placeholder="Search account" defaultValue={params.search ?? ""} />
        <select name="type" defaultValue={params.type ?? ""}><option value="">All types</option><option>ASSET</option><option>LIABILITY</option><option>EQUITY</option><option>INCOME</option><option>EXPENSE</option></select>
        <select name="isActive" defaultValue={params.isActive ?? ""}><option value="">Any status</option><option value="true">Active</option><option value="false">Inactive</option></select>
        <button type="submit">Filter</button>
      </form>
      <section className="vercent-table-wrap"><table className="vercent-table"><thead><tr><th>Code</th><th>Name</th><th>Type</th><th>Normal</th><th>Opening</th><th>Status</th></tr></thead><tbody>{accounts.rows.map((account) => <tr key={account.id}><td><Link href={`/finance/accounts/${account.id}`}>{account.accountCode}</Link></td><td>{account.accountName}</td><td>{account.accountType}</td><td>{account.normalBalance}</td><td>{account.openingBalance.toLocaleString("en-IN")}</td><td>{account.isActive ? "Active" : "Inactive"}</td></tr>)}</tbody></table></section>
    </main>
  );
}
