import Link from "next/link";
import { ModuleHeader } from "../../../components/layout/ModuleHeader";
import { listCustomerReceipts } from "../../../features/finance/customer-receipts/api";

export default async function CustomerReceiptsPage({ searchParams }: { searchParams?: Record<string, string | undefined> }) {
  const params = searchParams ?? {};
  const receipts = await listCustomerReceipts(params);
  const posted = receipts.rows.filter((receipt) => receipt.status === "POSTED").reduce((sum, receipt) => sum + receipt.amountReceived, 0);
  const draft = receipts.rows.filter((receipt) => receipt.status === "DRAFT").reduce((sum, receipt) => sum + receipt.amountReceived, 0);
  return (
    <main className="page-shell">
      <ModuleHeader title="Customer Receipts" eyebrow="Finance" description="Customer collections allocated to issued, accounting-posted invoices." actions={<Link className="vercent-button" href="/finance/customer-receipts/new">Create receipt</Link>} />
      <section className="grid-panel"><article className="metric-card"><span>Receipts</span><strong>{receipts.total}</strong></article><article className="metric-card"><span>Posted value</span><strong>{posted.toLocaleString("en-IN")}</strong></article><article className="metric-card"><span>Draft value</span><strong>{draft.toLocaleString("en-IN")}</strong></article></section>
      <form className="vercent-toolbar"><input name="search" placeholder="Search receipt" defaultValue={params.search ?? ""} /><select name="status" defaultValue={params.status ?? ""}><option value="">All statuses</option><option>DRAFT</option><option>POSTED</option><option>CANCELLED</option></select><select name="paymentMethod" defaultValue={params.paymentMethod ?? ""}><option value="">All methods</option><option>CASH</option><option>BANK_TRANSFER</option><option>CHEQUE</option><option>UPI</option><option>CARD</option><option>OTHER</option></select><input name="customerId" placeholder="Customer ID" defaultValue={params.customerId ?? ""} /><button>Filter</button></form>
      <section className="vercent-table-wrap"><table className="vercent-table"><thead><tr><th>Receipt</th><th>Date</th><th>Customer</th><th>Status</th><th>Method</th><th>Amount</th><th>Allocated</th></tr></thead><tbody>{receipts.rows.map((receipt) => <tr key={receipt.id}><td><Link href={`/finance/customer-receipts/${receipt.id}`}>{receipt.receiptNumber}</Link></td><td>{receipt.receiptDate}</td><td>{receipt.customerId}</td><td>{receipt.status}</td><td>{receipt.paymentMethod}</td><td>{receipt.amountReceived.toLocaleString("en-IN")}</td><td>{receipt.allocatedAmount.toLocaleString("en-IN")}</td></tr>)}</tbody></table></section>
    </main>
  );
}
