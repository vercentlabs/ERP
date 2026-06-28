import Link from "next/link";
import { ModuleHeader } from "../../../components/layout/ModuleHeader";
import { listBankAccounts } from "../../../features/finance/banking/api";

export default async function BankAccountsPage({ searchParams }: { searchParams?: Record<string, string | undefined> }) {
  const params = searchParams ?? {};
  const accounts = await listBankAccounts(params);
  return (
    <main className="page-shell">
      <ModuleHeader title="Bank & Cash Accounts" eyebrow="Finance" description="Define bank and cash accounts linked to chart-of-account cash/bank ledgers." actions={<Link className="vercent-button" href="/finance/bank-accounts/new">Create account</Link>} />
      <form className="vercent-toolbar">
        <input name="search" placeholder="Search account" defaultValue={params.search ?? ""} />
        <select name="status" defaultValue={params.status ?? ""}><option value="">Any status</option><option>ACTIVE</option><option>INACTIVE</option></select>
        <select name="accountType" defaultValue={params.accountType ?? ""}><option value="">All types</option><option>CASH</option><option>CURRENT</option><option>SAVINGS</option><option>OD</option><option>OTHER</option></select>
        <button type="submit">Filter</button>
      </form>
      <section className="vercent-table-wrap">
        <table className="vercent-table"><thead><tr><th>Name</th><th>Type</th><th>Currency</th><th>Opening</th><th>Status</th><th>Default</th></tr></thead><tbody>{accounts.rows.map((account) => <tr key={account.id}><td><Link href={`/finance/bank-accounts/${account.id}`}>{account.accountName}</Link><br /><small>{account.bankName ?? "Cash account"}</small></td><td>{account.accountType}</td><td>{account.currency}</td><td>{account.openingBalance.toLocaleString("en-IN")}</td><td>{account.status}</td><td>{account.isDefault ? "Yes" : "No"}</td></tr>)}</tbody></table>
      </section>
    </main>
  );
}
