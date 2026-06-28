import Link from "next/link";
import { ModuleHeader } from "../../../../components/layout/ModuleHeader";
import { createQuotationAction } from "../../../../features/sales/quotations/actions";

function today() {
  return new Date().toISOString().slice(0, 10);
}

export default function NewQuotationPage({ searchParams = {} }: { searchParams?: Record<string, string> }) {
  return (
    <main className="page-shell">
      <ModuleHeader
        title="Create Quotation"
        eyebrow="Sales Quotations"
        description="Create a formal offer with server-calculated totals."
        actions={<Link className="vercent-button secondary" href="/sales/quotations">Back to quotations</Link>}
      />

      <form action={createQuotationAction} className="vercent-form">
        <label>Customer ID<input name="customerId" required defaultValue={searchParams.customerId ?? ""} /></label>
        <label>Opportunity ID<input name="opportunityId" defaultValue={searchParams.opportunityId ?? ""} /></label>
        <label>Quote date<input name="quoteDate" type="date" defaultValue={today()} /></label>
        <label>Valid until<input name="validUntil" type="date" required /></label>
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

        <div className="full form-actions">
          <button type="submit">Create quotation</button>
        </div>
      </form>
    </main>
  );
}
