import { ModuleHeader } from "../../../../components/layout/ModuleHeader";
import { createSalesInvoiceAction } from "../../../../features/sales/invoices/actions";

export default function NewInvoicePage() {
  return (
    <main className="page-shell">
      <ModuleHeader title="New Sales Invoice" eyebrow="Sales billing" description="Create a draft manual invoice or provide order/delivery references." />
      <form action={createSalesInvoiceAction} className="vercent-form">
        <label>Customer ID<input name="customerId" required /></label><label>Sales order ID<input name="salesOrderId" /></label><label>Delivery note ID<input name="deliveryNoteId" /></label>
        <label>Invoice date<input name="invoiceDate" type="date" /></label><label>Due date<input name="dueDate" type="date" /></label><label>Currency<input name="currency" defaultValue="INR" /></label>
        <label>Billing address ID<input name="billingAddressId" /></label><label>Shipping address ID<input name="shippingAddressId" /></label><label>Terms<textarea name="terms" /></label><label>Notes<textarea name="notes" /></label>
        <section className="vercent-panel"><h2>Lines</h2>{[1,2,3,4,5].map((line) => <div className="vercent-grid" key={line}><label>Item ID<input name={`line${line}ItemId`} /></label><label>Description<input name={`line${line}Description`} /></label><label>Quantity<input name={`line${line}Quantity`} type="number" min="0" step="0.0001" /></label><label>UOM ID<input name={`line${line}UomId`} /></label><label>Unit price<input name={`line${line}UnitPrice`} type="number" min="0" step="0.01" /></label><label>Discount %<input name={`line${line}DiscountPercent`} type="number" min="0" max="100" step="0.01" /></label><label>Tax %<input name={`line${line}TaxRate`} type="number" min="0" step="0.01" /></label></div>)}</section>
        <button type="submit">Create draft invoice</button>
      </form>
    </main>
  );
}
