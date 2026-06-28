import Link from "next/link";
import { ModuleHeader } from "../../../components/layout/ModuleHeader";
import { listCustomerRefunds } from "../../../features/finance/customer-refunds/api";

export default async function CustomerRefundsPage({ searchParams }: { searchParams?: Record<string, string | undefined> }) {
  const params = searchParams ?? {};
  const refunds = await listCustomerRefunds(params);
  const posted = refunds.rows.filter((refund) => refund.status === "POSTED").reduce((sum, refund) => sum + refund.totalAmount, 0);
  const draft = refunds.rows.filter((refund) => refund.status === "DRAFT").reduce((sum, refund) => sum + refund.totalAmount, 0);
  return (
    <main className="page-shell">
      <ModuleHeader title="Customer Refunds" eyebrow="Finance" description="Cash or bank refunds issued from available posted credit notes." actions={<Link className="vercent-button" href="/finance/customer-refunds/new">Create refund</Link>} />
      <section className="grid-panel"><article className="metric-card"><span>Refunds</span><strong>{refunds.total}</strong></article><article className="metric-card"><span>Posted value</span><strong>{posted.toLocaleString("en-IN")}</strong></article><article className="metric-card"><span>Draft value</span><strong>{draft.toLocaleString("en-IN")}</strong></article></section>
      <form className="vercent-toolbar"><input name="search" placeholder="Search refund" defaultValue={params.search ?? ""} /><select name="status" defaultValue={params.status ?? ""}><option value="">All statuses</option><option>DRAFT</option><option>POSTED</option><option>CANCELLED</option></select><select name="paymentMethod" defaultValue={params.paymentMethod ?? ""}><option value="">All methods</option><option>CASH</option><option>BANK_TRANSFER</option><option>CHEQUE</option><option>UPI</option><option>CARD</option><option>OTHER</option></select><input name="customerId" placeholder="Customer ID" defaultValue={params.customerId ?? ""} /><button>Filter</button></form>
      <section className="vercent-table-wrap"><table className="vercent-table"><thead><tr><th>Refund</th><th>Date</th><th>Customer</th><th>Status</th><th>Method</th><th>Amount</th><th>Journal</th></tr></thead><tbody>{refunds.rows.map((refund) => <tr key={refund.id}><td><Link href={`/finance/customer-refunds/${refund.id}`}>{refund.refundNumber}</Link></td><td>{refund.refundDate}</td><td>{refund.customerId}</td><td>{refund.status}</td><td>{refund.paymentMethod}</td><td>{refund.totalAmount.toLocaleString("en-IN")}</td><td>{refund.journalEntryId ?? "-"}</td></tr>)}</tbody></table></section>
    </main>
  );
}
