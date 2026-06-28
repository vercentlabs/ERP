import Link from "next/link";
import { ModuleHeader } from "../../../components/layout/ModuleHeader";
import { getSalesOrderStats, listSalesOrders, type SalesOrderListParams } from "../../../features/sales/orders/api";

type PageProps = { searchParams?: SalesOrderListParams };

function pageHref(searchParams: SalesOrderListParams, page: number) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries({ ...searchParams, page: String(page) })) if (value) params.set(key, value);
  return `/sales/orders?${params.toString()}`;
}

export default async function SalesOrdersPage({ searchParams = {} }: PageProps) {
  const [orders, stats] = await Promise.all([listSalesOrders(searchParams), getSalesOrderStats(searchParams)]);
  const currentPage = orders.page;
  const totalPages = Math.max(1, Math.ceil(orders.total / orders.pageSize));

  return (
    <main className="page-shell">
      <ModuleHeader
        title="Sales Orders"
        eyebrow="Vercent ERP"
        description="Confirmed customer orders created manually or from accepted quotations."
        actions={<Link className="vercent-button" href="/sales/orders/new">Create sales order</Link>}
      />
      <section className="grid-panel">
        <article className="metric-card"><span>Draft value</span><strong>{stats.draftValue.toLocaleString("en-IN")}</strong></article>
        <article className="metric-card"><span>Confirmed value</span><strong>{stats.confirmedValue.toLocaleString("en-IN")}</strong></article>
        <article className="metric-card"><span>Closed value</span><strong>{stats.closedValue.toLocaleString("en-IN")}</strong></article>
        <article className="metric-card"><span>Cancelled value</span><strong>{stats.cancelledValue.toLocaleString("en-IN")}</strong></article>
      </section>
      <form className="vercent-toolbar">
        <input name="search" placeholder="Search order number or notes" defaultValue={searchParams.search ?? ""} />
        <select name="status" defaultValue={searchParams.status ?? ""}>
          <option value="">All statuses</option>
          <option value="DRAFT">Draft</option>
          <option value="CONFIRMED">Confirmed</option>
          <option value="CANCELLED">Cancelled</option>
          <option value="CLOSED">Closed</option>
        </select>
        <input name="customerId" placeholder="Customer ID" defaultValue={searchParams.customerId ?? ""} />
        <input name="quotationId" placeholder="Quotation ID" defaultValue={searchParams.quotationId ?? ""} />
        <button type="submit">Filter</button>
      </form>
      <section className="vercent-table-wrap">
        <table className="vercent-table">
          <thead><tr><th>Order</th><th>Customer</th><th>Quotation</th><th>Status</th><th>Order date</th><th>Delivery</th><th>Total</th></tr></thead>
          <tbody>
            {orders.rows.map((order) => (
              <tr key={order.id}>
                <td><Link href={`/sales/orders/${order.id}`}><strong>{order.orderNumber}</strong></Link></td>
                <td><Link href={`/master-data/customers/${order.customerId}`}>{order.customerId}</Link></td>
                <td>{order.quotationId ? <Link href={`/sales/quotations/${order.quotationId}`}>{order.quotationId}</Link> : "-"}</td>
                <td><span className="vercent-status">{order.status}</span></td>
                <td>{order.orderDate}</td>
                <td>{order.expectedDeliveryDate ?? "-"}</td>
                <td>{order.currency} {order.totalAmount.toLocaleString("en-IN")}</td>
              </tr>
            ))}
            {orders.rows.length === 0 ? <tr><td colSpan={7}>No sales orders found.</td></tr> : null}
          </tbody>
        </table>
      </section>
      <nav className="vercent-pagination">
        <Link aria-disabled={currentPage <= 1} href={pageHref(searchParams, Math.max(1, currentPage - 1))}>Previous</Link>
        <span>Page {currentPage} of {totalPages}</span>
        <Link aria-disabled={currentPage >= totalPages} href={pageHref(searchParams, Math.min(totalPages, currentPage + 1))}>Next</Link>
      </nav>
    </main>
  );
}
