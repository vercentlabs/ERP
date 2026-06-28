import Link from "next/link";
import { ModuleHeader } from "../../../../components/layout/ModuleHeader";
import { getParty, getSupplier } from "../../../../features/master-data/api";

type PageProps = { params: { id: string } };

export default async function SupplierDetailPage({ params }: PageProps) {
  const supplier = await getSupplier(params.id);
  const party = await getParty(supplier.partyId);

  return (
    <main className="page-shell">
      <ModuleHeader title={party.displayName} eyebrow={supplier.supplierNumber} description={`Supplier group: ${supplier.supplierGroup ?? "Unassigned"}`} actions={<Link className="vercent-button" href={`/master-data/suppliers/${supplier.id}/edit`}>Edit</Link>} />
      <section className="vercent-detail-grid">
        <article>
          <h2>Supplier details</h2>
          <dl className="vercent-fields">
            <dt>Status</dt><dd><span className="vercent-status">{supplier.status}</span></dd>
            <dt>Party</dt><dd><Link href={`/master-data/parties/${party.id}`}>{party.displayName}</Link></dd>
            <dt>Payment terms</dt><dd>{supplier.paymentTerms ?? "-"}</dd>
            <dt>Currency</dt><dd>{supplier.currency}</dd>
            <dt>GST treatment</dt><dd>{supplier.gstTreatment ?? "-"}</dd>
            <dt>Rating</dt><dd>{supplier.rating ?? "-"}</dd>
          </dl>
        </article>
      </section>
    </main>
  );
}
