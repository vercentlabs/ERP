import Link from "next/link";
import { ModuleHeader } from "../../../components/layout/ModuleHeader";
import { listParties, type ListParams } from "../../../features/master-data/api";

type PageProps = { searchParams?: ListParams };

function pageHref(searchParams: ListParams, page: number) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries({ ...searchParams, page: String(page) })) {
    if (value) params.set(key, value);
  }
  return `/master-data/parties?${params.toString()}`;
}

export default async function PartiesPage({ searchParams = {} }: PageProps) {
  const parties = await listParties(searchParams);
  const totalPages = Math.max(1, Math.ceil(parties.total / parties.pageSize));

  return (
    <main className="page-shell">
      <ModuleHeader
        title="Parties"
        eyebrow="Master Data"
        description="Central party records shared by customers, suppliers, addresses, tax details, and downstream ERP documents."
        actions={<Link className="vercent-button" href="/master-data/parties/new">Create party</Link>}
      />

      <form className="vercent-toolbar">
        <input name="search" placeholder="Search name, email, phone, GSTIN" defaultValue={searchParams.search ?? ""} />
        <select name="type" defaultValue={searchParams.type ?? ""}>
          <option value="">All types</option>
          <option value="COMPANY">Company</option>
          <option value="INDIVIDUAL">Individual</option>
        </select>
        <select name="status" defaultValue={searchParams.status ?? ""}>
          <option value="">All statuses</option>
          <option value="ACTIVE">Active</option>
          <option value="INACTIVE">Inactive</option>
          <option value="BLOCKED">Blocked</option>
        </select>
        <button type="submit">Filter</button>
      </form>

      <section className="vercent-table-wrap">
        <table className="vercent-table">
          <thead>
            <tr>
              <th>Party</th>
              <th>Type</th>
              <th>Contact</th>
              <th>Tax</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {parties.rows.map((party) => (
              <tr key={party.id}>
                <td>
                  <Link href={`/master-data/parties/${party.id}`}>
                    <strong>{party.displayName}</strong>
                    <span>{party.partyNumber}</span>
                  </Link>
                </td>
                <td>{party.partyType}</td>
                <td>{party.email ?? party.phone ?? "-"}</td>
                <td>{party.gstin ?? party.pan ?? "-"}</td>
                <td><span className="vercent-status">{party.status}</span></td>
              </tr>
            ))}
            {parties.rows.length === 0 ? (
              <tr><td colSpan={5}>No parties found.</td></tr>
            ) : null}
          </tbody>
        </table>
      </section>

      <nav className="vercent-pagination">
        <Link aria-disabled={parties.page <= 1} href={pageHref(searchParams, Math.max(1, parties.page - 1))}>Previous</Link>
        <span>Page {parties.page} of {totalPages}</span>
        <Link aria-disabled={parties.page >= totalPages} href={pageHref(searchParams, Math.min(totalPages, parties.page + 1))}>Next</Link>
      </nav>
    </main>
  );
}
