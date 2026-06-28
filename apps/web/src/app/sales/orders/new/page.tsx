import Link from "next/link";
import { ModuleHeader } from "../../../../components/layout/ModuleHeader";
import { createSalesOrderAction } from "../../../../features/sales/orders/actions";

const today = () => new Date().toISOString().slice(0, 10);

export default function NewSalesOrderPage({ searchParams = {} }: { searchParams?: Record<string, string> }) {
  return (
    <main className="page-shell">
      <ModuleHeader
        title="Create Sales Order"
        eyebrow="Sales Orders"
        description="Create a customer order without inventory reservation or accounting posting."
        actions={<Link className="vercent-button secondary" href="/sales/orders">Back to orders</Link>}
      />
      <form action={createSalesOrderAction} className="vercent-form">
        <label>Customer ID<input name="customerId" required defaultValue={searchParams.customerId ?? ""} /></label>
        <label>Quotation ID<input name="quotationId" defaultValue={searchParams.quotationId ?? ""} /></label>
        <label>Opportunity ID<input name="opportunityId" defaultValue={searchParams.opportunityId ?? ""} /></label>
        <label>Order date<input name="orderDate" type="date" defaultValue={today()} /></label>
        <label>Expected delivery<input name="expectedDeliveryDate" type="date" /></label>
        <label>Currency<input name="currency" defaultValue={searchParams.currency ?? "INR"} maxLength={3} /></label>
        <label>Exchange rate<input name="exchangeRate" type="number" min="0.000001" step="0.000001" defaultValue="1" /></label>
        <label>Billing address ID<input name="billingAddressId" /></label>
        <label>Shipping address ID<input name="shippingAddressId" /></label>
        <label className="full">Terms<textarea name="terms" rows={3} /></label>
        <label className="full">Notes<textarea name="notes" rows={3} /></label>
        <fieldset className="full">
          <legend>Lines</legend>
          {[1, 2, 3, 4, 5].map((line) => (
            <div className="vercent-line-grid" key={line}>
              <input name={`line${line}ItemId`} placeholder={`Line ${line} item ID`} required={line === 1} />
              <input name={`line${line}Description`} placeholder="Description" />
              <input name={`line${line}Quantity`} type="number" min="0.0001" step="0.0001" placeholder="Qty" required={line === 1} />
              <input name={`line${line}UomId`} placeholder="UOM ID" required={line === 1} />
              <input name={`line${line}UnitPrice`} type="number" min="0" step="0.01" placeholder="Unit price" required={line === 1} />
              <input name={`line${line}DiscountPercent`} type="number" min="0" max="100" step="0.01" placeholder="Disc %" />
              <input name={`line${line}TaxRate`} type="number" min="0" step="0.01" placeholder="Tax %" />
            </div>
          ))}
        </fieldset>
        <div className="full form-actions"><button type="submit">Create sales order</button></div>
      </form>
    </main>
  );
}
