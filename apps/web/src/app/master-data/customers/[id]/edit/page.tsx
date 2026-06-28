import Link from "next/link";
import { ModuleHeader } from "../../../../../components/layout/ModuleHeader";
import { updateCustomerAction } from "../../../../../features/master-data/actions";
import { getCustomer } from "../../../../../features/master-data/api";

type PageProps = { params: { id: string } };

export default async function EditCustomerPage({ params }: PageProps) {
  const customer = await getCustomer(params.id);
  const action = updateCustomerAction.bind(null, customer.id);

  return (
    <main className="page-shell">
      <ModuleHeader title="Edit Customer" eyebrow={customer.customerNumber} description="Update customer role settings." actions={<Link className="vercent-button secondary" href={`/master-data/customers/${customer.id}`}>Back to customer</Link>} />
      <form action={action} className="vercent-form">
        <label>Customer group<input name="customerGroup" defaultValue={customer.customerGroup ?? ""} /></label>
        <label>Credit limit<input name="creditLimit" type="number" min="0" step="0.01" defaultValue={customer.creditLimit} /></label>
        <label>Payment terms<input name="paymentTerms" defaultValue={customer.paymentTerms ?? ""} /></label>
        <label>Currency<input name="currency" defaultValue={customer.currency} maxLength={3} /></label>
        <label>GST treatment<input name="gstTreatment" defaultValue={customer.gstTreatment ?? ""} /></label>
        <label>Status<select name="status" defaultValue={customer.status}><option value="ACTIVE">Active</option><option value="INACTIVE">Inactive</option><option value="BLOCKED">Blocked</option></select></label>
        <div className="full form-actions"><button type="submit">Save changes</button></div>
      </form>
    </main>
  );
}
