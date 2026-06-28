import Link from "next/link";
import { ModuleHeader } from "../../../components/layout/ModuleHeader";
import { getQuotationStats, listQuotations, type QuotationListParams } from "../../../features/sales/quotations/api";

type PageProps = {
  searchParams?: QuotationListParams;
};

function pageHref(searchParams: QuotationListParams, page: number) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries({ ...searchParams, page: String(page) })) {
    if (value) params.set(key, value);
  }
  return `/sales/quotations?${params.toString()}`;
}

export default async function SalesQuotationsPage({ searchParams = {} }: PageProps) {
  const [quotations, stats] = await Promise.all([listQuotations(searchParams), getQuotationStats(searchParams)]);
  const currentPage = quotations.page;
  const totalPages = Math.max(1, Math.ceil(quotations.total / quotations.pageSize));

  return (
    <main className="page-shell">
      <ModuleHeader
        title="Sales Quotations"
        eyebrow="Vercent ERP"
        description="Create formal customer offers from opportunities before sales orders."
        actions={<Link className="vercent-button" href="/sales/quotations/new">Create quotation</Link>}
      />

      <section className="grid-panel">
        <article className="metric-card"><span>Draft value</span><strong>{stats.draftValue.toLocaleString("en-IN")}</strong></article>
        <article className="metric-card"><span>Sent value</span><strong>{stats.sentValue.toLocaleString("en-IN")}</strong></article>
        <article className="metric-card"><span>Accepted value</span><strong>{stats.acceptedValue.toLocaleString("en-IN")}</strong></article>
        <article className="metric-card"><span>Rejected/expired</span><strong>{stats.rejectedExpiredValue.toLocaleString("en-IN")}</strong></article>
      </section>

      <form className="vercent-toolbar">
        <input name="search" placeholder="Search quotation number or notes" defaultValue={searchParams.search ?? ""} />
        <select name="status" defaultValue={searchParams.status ?? ""}>
          <option value="">All statuses</option>
          <option value="DRAFT">Draft</option>
          <option value="SENT">Sent</option>
          <option value="ACCEPTED">Accepted</option>
          <option value="REJECTED">Rejected</option>
          <option value="EXPIRED">Expired</option>
          <option value="CANCELLED">Cancelled</option>
        </select>
        <input name="customerId" placeholder="Customer ID" defaultValue={searchParams.customerId ?? ""} />
        <input name="opportunityId" placeholder="Opportunity ID" defaultValue={searchParams.opportunityId ?? ""} />
        <button type="submit">Filter</button>
      </form>

      <section className="vercent-table-wrap">
        <table className="vercent-table">
          <thead>
            <tr>
              <th>Quotation</th>
              <th>Customer</th>
              <th>Opportunity</th>
              <th>Status</th>
              <th>Quote date</th>
              <th>Valid until</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {quotations.rows.map((quotation) => (
              <tr key={quotation.id}>
                <td><Link href={`/sales/quotations/${quotation.id}`}><strong>{quotation.quotationNumber}</strong></Link></td>
                <td><Link href={`/master-data/customers/${quotation.customerId}`}>{quotation.customerId}</Link></td>
                <td>{quotation.opportunityId ? <Link href={`/crm/opportunities/${quotation.opportunityId}`}>{quotation.opportunityId}</Link> : "-"}</td>
                <td><span className="vercent-status">{quotation.status}</span></td>
                <td>{quotation.quoteDate}</td>
                <td>{quotation.validUntil}</td>
                <td>{quotation.currency} {quotation.totalAmount.toLocaleString("en-IN")}</td>
              </tr>
            ))}
            {quotations.rows.length === 0 ? <tr><td colSpan={7}>No quotations found.</td></tr> : null}
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
