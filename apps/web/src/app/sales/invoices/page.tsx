import Link from "next/link";
import { ModuleHeader } from "../../../components/layout/ModuleHeader";
import { getSalesInvoiceStats, listSalesInvoices } from "../../../features/sales/invoices/api";

export default async function SalesInvoicesPage({ searchParams }: { searchParams?: Record<string, string | undefined> }) {
  const params = searchParams ?? {};
  const [invoices, stats] = await Promise.all([listSalesInvoices(params), getSalesInvoiceStats(params)]);
  return (
    <main className="page-shell">
      <ModuleHeader title="Sales Invoices" eyebrow="Sales billing" description="Create, issue, and track customer invoices without payments or accounting posting." actions={<Link className="vercent-button" href="/sales/invoices/new">Create invoice</Link>} />
      <section className="grid-panel">
        <article className="metric-card"><span>Draft value</span><strong>{stats.draftValue.toLocaleString("en-IN")}</strong></article>
        <article className="metric-card"><span>Issued value</span><strong>{stats.issuedValue.toLocaleString("en-IN")}</strong></article>
        <article className="metric-card"><span>Unpaid</span><strong>{stats.unpaidValue.toLocaleString("en-IN")}</strong></article>
        <article className="metric-card"><span>Overdue</span><strong>{stats.overdueValue.toLocaleString("en-IN")}</strong></article>
      </section>
      <form className="vercent-toolbar">
        <input name="search" placeholder="Search invoices" defaultValue={params.search ?? ""} />
        <select name="status" defaultValue={params.status ?? ""}><option value="">All statuses</option><option value="DRAFT">Draft</option><option value="ISSUED">Issued</option><option value="CANCELLED">Cancelled</option></select>
        <select name="paymentStatus" defaultValue={params.paymentStatus ?? ""}><option value="">All payments</option><option value="UNPAID">Unpaid</option><option value="PARTIALLY_PAID">Partially paid</option><option value="PAID">Paid</option></select>
        <input name="customerId" placeholder="Customer ID" defaultValue={params.customerId ?? ""} />
        <button type="submit">Filter</button>
      </form>
      <section className="vercent-table-wrap"><table className="vercent-table"><thead><tr><th>Invoice</th><th>Customer</th><th>Status</th><th>Payment</th><th>Date</th><th>Due</th><th>Total</th><th>Due amount</th></tr></thead><tbody>{invoices.rows.map((invoice) => <tr key={invoice.id}><td><Link href={`/sales/invoices/${invoice.id}`}>{invoice.invoiceNumber}</Link></td><td>{invoice.customerId}</td><td>{invoice.status}</td><td>{invoice.paymentStatus}</td><td>{invoice.invoiceDate}</td><td>{invoice.dueDate ?? "-"}</td><td>{invoice.totalAmount.toLocaleString("en-IN")}</td><td>{invoice.amountDue.toLocaleString("en-IN")}</td></tr>)}</tbody></table></section>
    </main>
  );
}
