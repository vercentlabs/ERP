import Link from "next/link";
import { ModuleHeader } from "../../../components/layout/ModuleHeader";
import { getLeadStats, listLeads, type LeadListParams } from "../../../features/crm/leads/api";

type PageProps = {
  searchParams?: LeadListParams;
};

function pageHref(searchParams: LeadListParams, page: number) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries({ ...searchParams, page: String(page) })) {
    if (value) params.set(key, value);
  }
  return `/crm/leads?${params.toString()}`;
}

export default async function CrmLeadsPage({ searchParams = {} }: PageProps) {
  const [leads, stats] = await Promise.all([listLeads(searchParams), getLeadStats(searchParams)]);
  const currentPage = leads.page;
  const totalPages = Math.max(1, Math.ceil(leads.total / leads.pageSize));

  return (
    <main className="page-shell">
      <ModuleHeader
        title="CRM Leads"
        eyebrow="Vercent ERP"
        description="Capture, qualify, assign, and convert sales leads from the database-backed CRM pipeline."
        actions={<Link className="vercent-button" href="/crm/leads/new">Create lead</Link>}
      />

      <section className="grid-panel">
        <article className="metric-card">
          <span>Total leads</span>
          <strong>{stats.total}</strong>
        </article>
        <article className="metric-card">
          <span>Qualified</span>
          <strong>{stats.byStatus.QUALIFIED}</strong>
        </article>
        <article className="metric-card">
          <span>Expected value</span>
          <strong>{stats.totalExpectedValue.toLocaleString("en-IN")}</strong>
        </article>
        <article className="metric-card">
          <span>Average score</span>
          <strong>{stats.averageScore}</strong>
        </article>
      </section>

      <form className="vercent-toolbar">
        <input name="search" placeholder="Search name, company, email, phone" defaultValue={searchParams.search ?? ""} />
        <select name="status" defaultValue={searchParams.status ?? ""}>
          <option value="">All statuses</option>
          <option value="NEW">New</option>
          <option value="CONTACTED">Contacted</option>
          <option value="QUALIFIED">Qualified</option>
          <option value="DISQUALIFIED">Disqualified</option>
          <option value="CONVERTED">Converted</option>
        </select>
        <input name="source" placeholder="Source" defaultValue={searchParams.source ?? ""} />
        <button type="submit">Filter</button>
      </form>

      <section className="vercent-table-wrap">
        <table className="vercent-table">
          <thead>
            <tr>
              <th>Lead</th>
              <th>Company</th>
              <th>Status</th>
              <th>Source</th>
              <th>Score</th>
              <th>Expected value</th>
              <th>Owner</th>
            </tr>
          </thead>
          <tbody>
            {leads.rows.map((lead) => (
              <tr key={lead.id}>
                <td>
                  <Link href={`/crm/leads/${lead.id}`}>
                    <strong>{lead.firstName} {lead.lastName}</strong>
                    <span>{lead.leadNumber}</span>
                  </Link>
                </td>
                <td>{lead.companyName ?? "-"}</td>
                <td><span className="vercent-status">{lead.status}</span></td>
                <td>{lead.source ?? "-"}</td>
                <td>{lead.score}</td>
                <td>{lead.expectedValue ? `${lead.currency} ${lead.expectedValue.toLocaleString("en-IN")}` : "-"}</td>
                <td>{lead.ownerUserId ?? "-"}</td>
              </tr>
            ))}
            {leads.rows.length === 0 ? (
              <tr>
                <td colSpan={7}>No leads found.</td>
              </tr>
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
