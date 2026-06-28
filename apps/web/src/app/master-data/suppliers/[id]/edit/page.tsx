import Link from "next/link";
import { ModuleHeader } from "../../../../../components/layout/ModuleHeader";
import { updateSupplierAction } from "../../../../../features/master-data/actions";
import { getSupplier } from "../../../../../features/master-data/api";

type PageProps = { params: { id: string } };

export default async function EditSupplierPage({ params }: PageProps) {
  const supplier = await getSupplier(params.id);
  const action = updateSupplierAction.bind(null, supplier.id);

  return (
    <main className="page-shell">
      <ModuleHeader title="Edit Supplier" eyebrow={supplier.supplierNumber} description="Update supplier role settings." actions={<Link className="vercent-button secondary" href={`/master-data/suppliers/${supplier.id}`}>Back to supplier</Link>} />
      <form action={action} className="vercent-form">
        <label>Supplier group<input name="supplierGroup" defaultValue={supplier.supplierGroup ?? ""} /></label>
        <label>Payment terms<input name="paymentTerms" defaultValue={supplier.paymentTerms ?? ""} /></label>
        <label>Currency<input name="currency" defaultValue={supplier.currency} maxLength={3} /></label>
        <label>GST treatment<input name="gstTreatment" defaultValue={supplier.gstTreatment ?? ""} /></label>
        <label>Rating<input name="rating" type="number" min="0" max="5" step="0.1" defaultValue={supplier.rating ?? ""} /></label>
        <label>Status<select name="status" defaultValue={supplier.status}><option value="ACTIVE">Active</option><option value="INACTIVE">Inactive</option><option value="BLOCKED">Blocked</option></select></label>
        <div className="full form-actions"><button type="submit">Save changes</button></div>
      </form>
    </main>
  );
}
