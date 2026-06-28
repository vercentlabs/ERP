import Link from "next/link";
import { ModuleHeader } from "../../../components/layout/ModuleHeader";
import { listSuppliers, type ListParams } from "../../../features/master-data/api";

type PageProps = { searchParams?: ListParams };

export default async function SuppliersPage({ searchParams = {} }: PageProps) {
  const suppliers = await listSuppliers(searchParams);

  return (
    <main className="page-shell">
      <ModuleHeader title="Suppliers" eyebrow="Master Data" description="Supplier role records linked to parties for procurement, payables, and vendor performance." actions={<Link className="vercent-button" href="/master-data/suppliers/new">Create supplier</Link>} />
      <form className="vercent-toolbar">
        <input name="search" placeholder="Search supplier number or group" defaultValue={searchParams.search ?? ""} />
        <select name="status" defaultValue={searchParams.status ?? ""}><option value="">All statuses</option><option value="ACTIVE">Active</option><option value="INACTIVE">Inactive</option><option value="BLOCKED">Blocked</option></select>
        <input name="group" placeholder="Supplier group" defaultValue={searchParams.group ?? ""} />
        <button type="submit">Filter</button>
      </form>
      <section className="vercent-table-wrap">
        <table className="vercent-table">
          <thead><tr><th>Supplier</th><th>Group</th><th>Terms</th><th>Rating</th><th>Status</th></tr></thead>
          <tbody>
            {suppliers.rows.map((supplier) => (
              <tr key={supplier.id}>
                <td><Link href={`/master-data/suppliers/${supplier.id}`}><strong>{supplier.supplierNumber}</strong><span>{supplier.partyId}</span></Link></td>
                <td>{supplier.supplierGroup ?? "-"}</td>
                <td>{supplier.paymentTerms ?? "-"}</td>
                <td>{supplier.rating ?? "-"}</td>
                <td><span className="vercent-status">{supplier.status}</span></td>
              </tr>
            ))}
            {suppliers.rows.length === 0 ? <tr><td colSpan={5}>No suppliers found.</td></tr> : null}
          </tbody>
        </table>
      </section>
    </main>
  );
}
