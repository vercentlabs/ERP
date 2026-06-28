import Link from "next/link";
import { ModuleHeader } from "../../../../components/layout/ModuleHeader";
import { getCustomer, getParty } from "../../../../features/master-data/api";

type PageProps = { params: { id: string } };

export default async function CustomerDetailPage({ params }: PageProps) {
  const customer = await getCustomer(params.id);
  const party = await getParty(customer.partyId);

  return (
    <main className="page-shell">
      <ModuleHeader title={party.displayName} eyebrow={customer.customerNumber} description={`Customer group: ${customer.customerGroup ?? "Unassigned"}`} actions={<Link className="vercent-button" href={`/master-data/customers/${customer.id}/edit`}>Edit</Link>} />
      <section className="vercent-detail-grid">
        <article>
          <h2>Customer details</h2>
          <dl className="vercent-fields">
            <dt>Status</dt><dd><span className="vercent-status">{customer.status}</span></dd>
            <dt>Party</dt><dd><Link href={`/master-data/parties/${party.id}`}>{party.displayName}</Link></dd>
            <dt>Credit limit</dt><dd>{customer.currency} {customer.creditLimit.toLocaleString("en-IN")}</dd>
            <dt>Payment terms</dt><dd>{customer.paymentTerms ?? "-"}</dd>
            <dt>GST treatment</dt><dd>{customer.gstTreatment ?? "-"}</dd>
          </dl>
        </article>
      </section>
    </main>
  );
}
