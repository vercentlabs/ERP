import { ModuleHeader } from "../../../../components/layout/ModuleHeader";
import { getTrialBalance, listFiscalYears } from "../../../../features/finance/accounting/api";

export default async function TrialBalancePage({ searchParams }: { searchParams?: Record<string, string | undefined> }) {
  const params = searchParams ?? {};
  const [rows, years] = await Promise.all([getTrialBalance(params), listFiscalYears({ pageSize: "50" })]);
  return (
    <main className="page-shell">
      <ModuleHeader title="Trial Balance" eyebrow="Finance reports" description="Posted manual journal lines only. Sales invoices do not post accounting yet." />
      <form className="vercent-toolbar"><select name="fiscalYearId" defaultValue={params.fiscalYearId ?? ""}><option value="">All fiscal years</option>{years.rows.map((year) => <option key={year.id} value={year.id}>{year.name}</option>)}</select><input name="dateFrom" type="date" defaultValue={params.dateFrom ?? ""} /><input name="dateTo" type="date" defaultValue={params.dateTo ?? ""} /><button>Run</button></form>
      <section className="vercent-table-wrap"><table className="vercent-table"><thead><tr><th>Account</th><th>Type</th><th>Debit</th><th>Credit</th><th>Net balance</th></tr></thead><tbody>{rows.map((row) => <tr key={row.accountId}><td>{row.accountCode} - {row.accountName}</td><td>{row.accountType}</td><td>{row.debit.toLocaleString("en-IN")}</td><td>{row.credit.toLocaleString("en-IN")}</td><td>{row.netBalance.toLocaleString("en-IN")} {row.normalBalance}</td></tr>)}</tbody></table></section>
    </main>
  );
}
