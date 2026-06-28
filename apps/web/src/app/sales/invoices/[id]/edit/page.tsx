import { ModuleHeader } from "../../../../../components/layout/ModuleHeader";
import { updateSalesInvoiceAction } from "../../../../../features/sales/invoices/actions";
import { getSalesInvoice } from "../../../../../features/sales/invoices/api";

export default async function EditInvoicePage({ params }: { params: { id: string } }) {
  const invoice = await getSalesInvoice(params.id);
  if (invoice.status !== "DRAFT") return <main className="page-shell"><ModuleHeader title="Invoice locked" eyebrow="Sales billing" description="Issued or cancelled invoices cannot be edited." /></main>;
  return (
    <main className="page-shell">
      <ModuleHeader title={`Edit ${invoice.invoiceNumber}`} eyebrow="Sales billing" description="Edit draft invoice fields and lines." />
      <form action={updateSalesInvoiceAction.bind(null, invoice.id)} className="vercent-form">
        <label>Customer ID<input name="customerId" defaultValue={invoice.customerId} required /></label><label>Invoice date<input name="invoiceDate" type="date" defaultValue={invoice.invoiceDate} /></label><label>Due date<input name="dueDate" type="date" defaultValue={invoice.dueDate ?? ""} /></label><label>Currency<input name="currency" defaultValue={invoice.currency} /></label><label>Terms<textarea name="terms" defaultValue={invoice.terms ?? ""} /></label><label>Notes<textarea name="notes" defaultValue={invoice.notes ?? ""} /></label>
        <section className="vercent-panel"><h2>Lines</h2>{invoice.lines.map((line, index) => <div className="vercent-grid" key={line.id}><label>Item ID<input name={`line${index + 1}ItemId`} defaultValue={line.itemId} /></label><label>Description<input name={`line${index + 1}Description`} defaultValue={line.description ?? ""} /></label><label>Quantity<input name={`line${index + 1}Quantity`} type="number" step="0.0001" defaultValue={line.quantity} /></label><label>UOM ID<input name={`line${index + 1}UomId`} defaultValue={line.uomId} /></label><label>Unit price<input name={`line${index + 1}UnitPrice`} type="number" step="0.01" defaultValue={line.unitPrice} /></label><label>Discount %<input name={`line${index + 1}DiscountPercent`} type="number" step="0.01" defaultValue="0" /></label><label>Tax %<input name={`line${index + 1}TaxRate`} type="number" step="0.01" defaultValue="0" /></label></div>)}</section>
        <button type="submit">Save draft</button>
      </form>
    </main>
  );
}
