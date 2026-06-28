import Link from "next/link";
import { ModuleHeader } from "../../../../../components/layout/ModuleHeader";
import { updateQuotationAction } from "../../../../../features/sales/quotations/actions";
import { getQuotation } from "../../../../../features/sales/quotations/api";

export default async function EditQuotationPage({ params }: { params: { id: string } }) {
  const quotation = await getQuotation(params.id);
  const action = updateQuotationAction.bind(null, quotation.id);

  return (
    <main className="page-shell">
      <ModuleHeader
        title={`Edit ${quotation.quotationNumber}`}
        eyebrow="Sales Quotations"
        description="Update draft or sent quotation details. Totals are recalculated server-side."
        actions={<Link className="vercent-button secondary" href={`/sales/quotations/${quotation.id}`}>Back to quotation</Link>}
      />

      <form action={action} className="vercent-form">
        <label>Customer ID<input name="customerId" required defaultValue={quotation.customerId} /></label>
        <label>Opportunity ID<input name="opportunityId" defaultValue={quotation.opportunityId ?? ""} /></label>
        <label>Quote date<input name="quoteDate" type="date" defaultValue={quotation.quoteDate} /></label>
        <label>Valid until<input name="validUntil" type="date" required defaultValue={quotation.validUntil} /></label>
        <label>Currency<input name="currency" defaultValue={quotation.currency} maxLength={3} /></label>
        <label>Exchange rate<input name="exchangeRate" type="number" min="0.000001" step="0.000001" defaultValue={quotation.exchangeRate} /></label>
        <label>Billing address ID<input name="billingAddressId" defaultValue={quotation.billingAddressId ?? ""} /></label>
        <label>Shipping address ID<input name="shippingAddressId" defaultValue={quotation.shippingAddressId ?? ""} /></label>
        <label className="full">Terms<textarea name="terms" rows={3} defaultValue={quotation.terms ?? ""} /></label>
        <label className="full">Notes<textarea name="notes" rows={3} defaultValue={quotation.notes ?? ""} /></label>

        <fieldset className="full">
          <legend>Lines</legend>
          {[1, 2, 3, 4, 5].map((line) => {
            const current = quotation.lines[line - 1];
            return (
              <div className="vercent-line-grid" key={line}>
                <input name={`line${line}ItemId`} placeholder={`Line ${line} item ID`} defaultValue={current?.itemId ?? ""} required={line === 1} />
                <input name={`line${line}Description`} placeholder="Description" defaultValue={current?.description ?? ""} />
                <input name={`line${line}Quantity`} type="number" min="0.0001" step="0.0001" placeholder="Qty" defaultValue={current?.quantity ?? ""} required={line === 1} />
                <input name={`line${line}UomId`} placeholder="UOM ID" defaultValue={current?.uomId ?? ""} required={line === 1} />
                <input name={`line${line}UnitPrice`} type="number" min="0" step="0.01" placeholder="Unit price" defaultValue={current?.unitPrice ?? ""} required={line === 1} />
                <input name={`line${line}DiscountPercent`} type="number" min="0" max="100" step="0.01" placeholder="Disc %" defaultValue={current?.discountPercent ?? ""} />
                <input name={`line${line}TaxRate`} type="number" min="0" step="0.01" placeholder="Tax %" defaultValue={current?.taxRate ?? ""} />
              </div>
            );
          })}
        </fieldset>

        <div className="full form-actions">
          <button type="submit">Save quotation</button>
        </div>
      </form>
    </main>
  );
}
