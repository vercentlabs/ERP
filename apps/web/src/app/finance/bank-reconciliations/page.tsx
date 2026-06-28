import Link from "next/link";
import { ModuleHeader } from "../../../components/layout/ModuleHeader";
import { getBankReconciliationStats, listBankAccounts, listBankReconciliations } from "../../../features/finance/banking/api";

export default async function BankReconciliationsPage({ searchParams }: { searchParams?: Record<string, string | undefined> }) {
  const params = searchParams ?? {};
  const [bankAccounts, reconciliations, stats] = await Promise.all([listBankAccounts({ status: "ACTIVE", pageSize: "200" }), listBankReconciliations(params), getBankReconciliationStats()]);
  return (
    <main className="page-shell">
      <ModuleHeader title="Bank Reconciliations" eyebrow="Finance" description="Manually enter statement lines and match them to posted cash/bank journal lines. Bank APIs and automatic reconciliation are not implemented yet." actions={<Link className="vercent-button" href="/finance/bank-reconciliations/new">Create reconciliation</Link>} />
      <section className="vercent-metrics"><article><span>Draft</span><strong>{stats.draftCount}</strong></article><article><span>Completed</span><strong>{stats.completedCount}</strong></article><article><span>Unmatched statement</span><strong>{stats.unreconciledAmount.toLocaleString("en-IN")}</strong></article><article><span>Difference</span><strong>{stats.differenceAmount.toLocaleString("en-IN")}</strong></article></section>
      <form className="vercent-toolbar">
        <input name="search" placeholder="Search number" defaultValue={params.search ?? ""} />
        <select name="bankAccountId" defaultValue={params.bankAccountId ?? ""}><option value="">All accounts</option>{bankAccounts.rows.map((account) => <option key={account.id} value={account.id}>{account.accountName}</option>)}</select>
        <select name="status" defaultValue={params.status ?? ""}><option value="">Any status</option><option>DRAFT</option><option>COMPLETED</option><option>CANCELLED</option></select>
        <button type="submit">Filter</button>
      </form>
      <section className="vercent-table-wrap"><table className="vercent-table"><thead><tr><th>Number</th><th>Statement period</th><th>Status</th><th>System closing</th><th>Statement closing</th><th>Difference</th></tr></thead><tbody>{reconciliations.rows.map((row) => <tr key={row.id}><td><Link href={`/finance/bank-reconciliations/${row.id}`}>{row.reconciliationNumber}</Link></td><td>{row.statementStartDate} to {row.statementEndDate}</td><td>{row.status}</td><td>{row.systemClosingBalance.toLocaleString("en-IN")}</td><td>{row.closingStatementBalance.toLocaleString("en-IN")}</td><td>{row.differenceAmount.toLocaleString("en-IN")}</td></tr>)}</tbody></table></section>
    </main>
  );
}
