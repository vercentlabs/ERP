import { ModuleHeader } from "../../../components/layout/ModuleHeader";
import { getCashBankLedger, getCashBankSummary, listBankAccounts } from "../../../features/finance/banking/api";

export default async function CashBankLedgerPage({ searchParams }: { searchParams?: Record<string, string | undefined> }) {
  const params = searchParams ?? {};
  const [bankAccounts, ledger, summary] = await Promise.all([listBankAccounts({ status: "ACTIVE", pageSize: "200" }), getCashBankLedger(params), getCashBankSummary(params)]);
  return (
    <main className="page-shell">
      <ModuleHeader title="Cash/Bank Ledger" eyebrow="Finance" description="Derived from POSTED journal entry lines only. Receipts debit bank/cash and refunds credit bank/cash automatically." />
      <section className="vercent-metrics"><article><span>Opening</span><strong>{summary.openingBalance.toLocaleString("en-IN")}</strong></article><article><span>Debit</span><strong>{summary.totalDebit.toLocaleString("en-IN")}</strong></article><article><span>Credit</span><strong>{summary.totalCredit.toLocaleString("en-IN")}</strong></article><article><span>Closing</span><strong>{summary.closingBalance.toLocaleString("en-IN")}</strong></article></section>
      <form className="vercent-toolbar">
        <select name="bankAccountId" defaultValue={params.bankAccountId ?? ""}><option value="">All bank/cash accounts</option>{bankAccounts.rows.map((account) => <option key={account.id} value={account.id}>{account.accountName}</option>)}</select>
        <input name="dateFrom" type="date" defaultValue={params.dateFrom ?? ""} />
        <input name="dateTo" type="date" defaultValue={params.dateTo ?? ""} />
        <input name="referenceType" placeholder="Reference type" defaultValue={params.referenceType ?? ""} />
        <select name="reconciled" defaultValue={params.reconciled ?? ""}><option value="">Any match status</option><option value="true">Reconciled</option><option value="false">Unreconciled</option></select>
        <button type="submit">Filter</button>
      </form>
      <section className="vercent-table-wrap"><table className="vercent-table"><thead><tr><th>Date</th><th>Journal</th><th>Account</th><th>Reference</th><th>Description</th><th>Debit</th><th>Credit</th><th>Balance</th><th>Status</th></tr></thead><tbody>{ledger.rows.map((row) => <tr key={row.journalEntryLineId}><td>{row.postingDate}</td><td>{row.journalNumber}</td><td>{row.accountCode} - {row.accountName}</td><td>{row.referenceType ?? "-"}</td><td>{row.description ?? "-"}</td><td>{row.debitAmount.toLocaleString("en-IN")}</td><td>{row.creditAmount.toLocaleString("en-IN")}</td><td>{row.runningBalance.toLocaleString("en-IN")}</td><td>{row.isReconciled ? "Reconciled" : "Open"}</td></tr>)}</tbody></table></section>
    </main>
  );
}
