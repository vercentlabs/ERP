import { ModuleHeader } from "../../../components/layout/ModuleHeader";
import { createUomAction } from "../../../features/master-data/actions";
import { listUoms, type ListParams } from "../../../features/master-data/api";

type PageProps = { searchParams?: ListParams };

export default async function UomsPage({ searchParams = {} }: PageProps) {
  const uoms = await listUoms(searchParams);

  return (
    <main className="page-shell">
      <ModuleHeader title="Units of Measure" eyebrow="Master Data" description="Shared UOM catalog used by items, inventory, procurement, and sales documents." />

      <form className="vercent-toolbar">
        <input name="search" placeholder="Search code, name, category" defaultValue={searchParams.search ?? ""} />
        <select name="status" defaultValue={searchParams.status ?? ""}><option value="">All statuses</option><option value="ACTIVE">Active</option><option value="INACTIVE">Inactive</option><option value="BLOCKED">Blocked</option></select>
        <input name="group" placeholder="Category" defaultValue={searchParams.group ?? ""} />
        <button type="submit">Filter</button>
      </form>

      <form action={createUomAction} className="vercent-form">
        <label>Code<input name="code" required placeholder="NOS" /></label>
        <label>Name<input name="name" required placeholder="Numbers" /></label>
        <label>Category<input name="category" placeholder="Count, Weight, Length" /></label>
        <label>Precision<input name="precision" type="number" min="0" max="8" defaultValue="0" /></label>
        <label>Status<select name="status" defaultValue="ACTIVE"><option value="ACTIVE">Active</option><option value="INACTIVE">Inactive</option><option value="BLOCKED">Blocked</option></select></label>
        <label><input name="isBase" type="checkbox" /> Base unit</label>
        <div className="full form-actions"><button type="submit">Create UOM</button></div>
      </form>

      <section className="vercent-table-wrap">
        <table className="vercent-table">
          <thead><tr><th>Code</th><th>Name</th><th>Category</th><th>Precision</th><th>Base</th><th>Status</th></tr></thead>
          <tbody>
            {uoms.rows.map((uom) => (
              <tr key={uom.id}>
                <td><strong>{uom.code}</strong></td>
                <td>{uom.name}</td>
                <td>{uom.category ?? "-"}</td>
                <td>{uom.precision}</td>
                <td>{uom.isBase ? "Yes" : "No"}</td>
                <td><span className="vercent-status">{uom.status}</span></td>
              </tr>
            ))}
            {uoms.rows.length === 0 ? <tr><td colSpan={6}>No UOMs found.</td></tr> : null}
          </tbody>
        </table>
      </section>
    </main>
  );
}
