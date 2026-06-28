import Link from "next/link";
import { ModuleHeader } from "../../../components/layout/ModuleHeader";
import { getPipelineSummary, listOpportunities, type OpportunityListParams } from "../../../features/crm/opportunities/api";

type PageProps = {
  searchParams?: OpportunityListParams;
};

function pageHref(searchParams: OpportunityListParams, page: number) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries({ ...searchParams, page: String(page) })) {
    if (value) params.set(key, value);
  }
  return `/crm/opportunities?${params.toString()}`;
}

export default async function CrmOpportunitiesPage({ searchParams = {} }: PageProps) {
  const [opportunities, summary] = await Promise.all([listOpportunities(searchParams), getPipelineSummary(searchParams)]);
  const currentPage = opportunities.page;
  const totalPages = Math.max(1, Math.ceil(opportunities.total / opportunities.pageSize));

  return (
    <main className="page-shell">
      <ModuleHeader
        title="CRM Opportunities"
        eyebrow="Vercent ERP"
        description="Track customer-linked pipeline value from qualification through win or loss."
        actions={<Link className="vercent-button" href="/crm/opportunities/new">Create opportunity</Link>}
      />

      <section className="grid-panel">
        <article className="metric-card"><span>Open opportunities</span><strong>{summary.openCount}</strong></article>
        <article className="metric-card"><span>Pipeline value</span><strong>{summary.openValue.toLocaleString("en-IN")}</strong></article>
        <article className="metric-card"><span>Weighted value</span><strong>{Math.round(summary.weightedValue).toLocaleString("en-IN")}</strong></article>
        <article className="metric-card"><span>Won value</span><strong>{summary.wonValue.toLocaleString("en-IN")}</strong></article>
      </section>

      <form className="vercent-toolbar">
        <input name="search" placeholder="Search number, name, source" defaultValue={searchParams.search ?? ""} />
        <select name="stage" defaultValue={searchParams.stage ?? ""}>
          <option value="">All stages</option>
          <option value="PROSPECTING">Prospecting</option>
          <option value="QUALIFICATION">Qualification</option>
          <option value="PROPOSAL">Proposal</option>
          <option value="NEGOTIATION">Negotiation</option>
          <option value="WON">Won</option>
          <option value="LOST">Lost</option>
        </select>
        <input name="ownerUserId" placeholder="Owner user ID" defaultValue={searchParams.ownerUserId ?? ""} />
        <input name="customerId" placeholder="Customer ID" defaultValue={searchParams.customerId ?? ""} />
        <button type="submit">Filter</button>
      </form>

      <section className="vercent-table-wrap">
        <table className="vercent-table">
          <thead>
            <tr>
              <th>Opportunity</th>
              <th>Customer</th>
              <th>Stage</th>
              <th>Probability</th>
              <th>Expected value</th>
              <th>Close date</th>
              <th>Owner</th>
            </tr>
          </thead>
          <tbody>
            {opportunities.rows.map((opportunity) => (
              <tr key={opportunity.id}>
                <td>
                  <Link href={`/crm/opportunities/${opportunity.id}`}>
                    <strong>{opportunity.name}</strong>
                    <span>{opportunity.opportunityNumber}</span>
                  </Link>
                </td>
                <td><Link href={`/master-data/customers/${opportunity.customerId}`}>{opportunity.customerId}</Link></td>
                <td><span className="vercent-status">{opportunity.stage}</span></td>
                <td>{opportunity.probability}%</td>
                <td>{opportunity.currency} {opportunity.expectedValue.toLocaleString("en-IN")}</td>
                <td>{opportunity.expectedCloseDate ?? "-"}</td>
                <td>{opportunity.ownerUserId ?? "-"}</td>
              </tr>
            ))}
            {opportunities.rows.length === 0 ? (
              <tr><td colSpan={7}>No opportunities found.</td></tr>
            ) : null}
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
