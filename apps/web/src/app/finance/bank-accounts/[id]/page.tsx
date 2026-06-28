import Link from "next/link";
import { ModuleHeader } from "../../../../components/layout/ModuleHeader";
import { getBankAccount, getBankAccountLedger, getCashBankSummary, getUnreconciledJournalLines } from "../../../../features/finance/banking/api";
import { setDefaultBankAccountAction } from "../../../../features/finance/banking/actions";

export default async function BankAccountDetailPage({ params }: { params: { id: string } }) {
  const [account, ledger, summary, unreconciled] = await Promise.all([getBankAccount(params.id), getBankAccountLedger(params.id, { pageSize: "10" }), getCashBankSummary({ bankAccountId: params.id }), getUnreconciledJournalLines(params.id, { pageSize: "1" })]);
  return (
    <main className="page-shell">
      <ModuleHeader title={account.accountName} eyebrow="Bank/Cash Account" description={`${account.accountType} account linked to finance account ${account.accountId}.`} actions={<><Link className="vercent-button secondary" href={`/finance/bank-accounts/${account.id}/edit`}>Edit</Link><form action={setDefaultBankAccountAction.bind(null, account.id)}><button className="vercent-button" type="submit">Set default</button></form></>} />
      <section className="vercent-metrics"><article><span>System balance</span><strong>{summary.closingBalance.toLocaleString("en-IN")}</strong></article><article><span>Unreconciled lines</span><strong>{unreconciled.total}</strong></article><article><span>Status</span><strong>{account.status}</strong></article><article><span>Default</span><strong>{account.isDefault ? "Yes" : "No"}</strong></article></section>
      <section className="vercent-table-wrap"><table className="vercent-table"><thead><tr><th>Date</th><th>Journal</th><th>Description</th><th>Debit</th><th>Credit</th><th>Balance</th><th>Reconciled</th></tr></thead><tbody>{ledger.rows.map((row) => <tr key={row.journalEntryLineId}><td>{row.postingDate}</td><td>{row.journalNumber}</td><td>{row.description ?? row.referenceType}</td><td>{row.debitAmount.toLocaleString("en-IN")}</td><td>{row.creditAmount.toLocaleString("en-IN")}</td><td>{row.runningBalance.toLocaleString("en-IN")}</td><td>{row.isReconciled ? "Yes" : "No"}</td></tr>)}</tbody></table></section>
    </main>
  );
}
