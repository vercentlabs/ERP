import Link from "next/link";
import { ModuleHeader } from "../../../../components/layout/ModuleHeader";
import { createSupplierAction } from "../../../../features/master-data/actions";
import { listParties } from "../../../../features/master-data/api";

export default async function NewSupplierPage() {
  const parties = await listParties({ pageSize: "100" });

  return (
    <main className="page-shell">
      <ModuleHeader title="Create Supplier" eyebrow="Master Data" description="Assign a supplier role to an existing party." actions={<Link className="vercent-button secondary" href="/master-data/suppliers">Back to suppliers</Link>} />
      <form action={createSupplierAction} className="vercent-form">
        <label className="full">Party<select name="partyId" required><option value="">Select party</option>{parties.rows.map((party) => <option key={party.id} value={party.id}>{party.displayName} ({party.partyNumber})</option>)}</select></label>
        <label>Supplier group<input name="supplierGroup" /></label>
        <label>Payment terms<input name="paymentTerms" placeholder="Net 30" /></label>
        <label>Currency<input name="currency" defaultValue="INR" maxLength={3} /></label>
        <label>GST treatment<input name="gstTreatment" /></label>
        <label>Rating<input name="rating" type="number" min="0" max="5" step="0.1" /></label>
        <label>Status<select name="status" defaultValue="ACTIVE"><option value="ACTIVE">Active</option><option value="INACTIVE">Inactive</option><option value="BLOCKED">Blocked</option></select></label>
        <div className="full form-actions"><button type="submit">Create supplier</button></div>
      </form>
    </main>
  );
}
