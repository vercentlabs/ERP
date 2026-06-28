import Link from "next/link";
import { ModuleHeader } from "../../../components/layout/ModuleHeader";
import { listWarehouses } from "../../../features/inventory/stock/api";

export default async function InventoryWarehousesPage({ searchParams }: { searchParams?: { search?: string; status?: string; type?: string; page?: string } }) {
  const result = await listWarehouses({ search: searchParams?.search, status: searchParams?.status, type: searchParams?.type, page: searchParams?.page, pageSize: "25" });
  return (
    <main className="page-shell">
      <ModuleHeader title="Warehouses" eyebrow="Inventory" description="Physical and logical inventory storage locations." />
      <section className="toolbar">
        <form className="filter-row">
          <input name="search" placeholder="Search warehouse" defaultValue={searchParams?.search ?? ""} />
          <select name="status" defaultValue={searchParams?.status ?? ""}>
            <option value="">All statuses</option>
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
            <option value="BLOCKED">Blocked</option>
          </select>
          <select name="type" defaultValue={searchParams?.type ?? ""}>
            <option value="">All types</option>
            {["MAIN", "BRANCH", "TRANSIT", "VIRTUAL", "PRODUCTION", "THIRD_PARTY"].map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          <button type="submit">Filter</button>
        </form>
        <Link className="button" href="/inventory/warehouses/new">Create warehouse</Link>
      </section>
      <section className="table-panel">
        <table>
          <thead><tr><th>Number</th><th>Name</th><th>Code</th><th>Type</th><th>Status</th><th>Default</th></tr></thead>
          <tbody>
            {result.rows.map((warehouse) => (
              <tr key={warehouse.id}>
                <td><Link href={`/inventory/warehouses/${warehouse.id}`}>{warehouse.warehouseNumber}</Link></td>
                <td>{warehouse.name}</td>
                <td>{warehouse.code}</td>
                <td>{warehouse.type}</td>
                <td>{warehouse.status}</td>
                <td>{warehouse.isDefault ? "Yes" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {result.rows.length === 0 ? <p>No warehouses found.</p> : null}
      </section>
    </main>
  );
}
