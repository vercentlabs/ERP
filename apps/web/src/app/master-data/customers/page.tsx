import Link from "next/link";
import { ModuleHeader } from "../../../components/layout/ModuleHeader";
import { listCustomers, type ListParams } from "../../../features/master-data/api";

type PageProps = { searchParams?: ListParams };

export default async function CustomersPage({ searchParams = {} }: PageProps) {
  const customers = await listCustomers(searchParams);

  return (
    <main className="page-shell">
      <ModuleHeader
        title="Customers"
        eyebrow="Master Data"
        description="Customer role records linked to parties for sales, receivables, tax treatment, and credit control."
        actions={<Link className="vercent-button" href="/master-data/customers/new">Create customer</Link>}
      />
      <form className="vercent-toolbar">
        <input name="search" placeholder="Search customer number or group" defaultValue={searchParams.search ?? ""} />
        <select name="status" defaultValue={searchParams.status ?? ""}><option value="">All statuses</option><option value="ACTIVE">Active</option><option value="INACTIVE">Inactive</option><option value="BLOCKED">Blocked</option></select>
        <input name="group" placeholder="Customer group" defaultValue={searchParams.group ?? ""} />
        <button type="submit">Filter</button>
      </form>
      <section className="vercent-table-wrap">
        <table className="vercent-table">
          <thead><tr><th>Customer</th><th>Group</th><th>Credit limit</th><th>Terms</th><th>Status</th></tr></thead>
          <tbody>
            {customers.rows.map((customer) => (
              <tr key={customer.id}>
                <td><Link href={`/master-data/customers/${customer.id}`}><strong>{customer.customerNumber}</strong><span>{customer.partyId}</span></Link></td>
                <td>{customer.customerGroup ?? "-"}</td>
                <td>{customer.currency} {customer.creditLimit.toLocaleString("en-IN")}</td>
                <td>{customer.paymentTerms ?? "-"}</td>
                <td><span className="vercent-status">{customer.status}</span></td>
              </tr>
            ))}
            {customers.rows.length === 0 ? <tr><td colSpan={5}>No customers found.</td></tr> : null}
          </tbody>
        </table>
      </section>
    </main>
  );
}
