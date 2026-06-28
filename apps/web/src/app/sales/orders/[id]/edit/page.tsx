import Link from "next/link";
import { ModuleHeader } from "../../../../../components/layout/ModuleHeader";
import { updateSalesOrderAction } from "../../../../../features/sales/orders/actions";
import { getSalesOrder } from "../../../../../features/sales/orders/api";

export default async function EditSalesOrderPage({ params }: { params: { id: string } }) {
  const order = await getSalesOrder(params.id);
  const action = updateSalesOrderAction.bind(null, order.id);
  return (
    <main className="page-shell">
      <ModuleHeader
        title={`Edit ${order.orderNumber}`}
        eyebrow="Sales Orders"
        description="Update draft sales order details. Totals are recalculated server-side."
        actions={<Link className="vercent-button secondary" href={`/sales/orders/${order.id}`}>Back to order</Link>}
      />
      <form action={action} className="vercent-form">
        <label>Customer ID<input name="customerId" required defaultValue={order.customerId} /></label>
        <label>Quotation ID<input name="quotationId" defaultValue={order.quotationId ?? ""} /></label>
        <label>Opportunity ID<input name="opportunityId" defaultValue={order.opportunityId ?? ""} /></label>
        <label>Order date<input name="orderDate" type="date" defaultValue={order.orderDate} /></label>
        <label>Expected delivery<input name="expectedDeliveryDate" type="date" defaultValue={order.expectedDeliveryDate ?? ""} /></label>
        <label>Currency<input name="currency" defaultValue={order.currency} maxLength={3} /></label>
        <label>Exchange rate<input name="exchangeRate" type="number" min="0.000001" step="0.000001" defaultValue={order.exchangeRate} /></label>
        <label>Billing address ID<input name="billingAddressId" defaultValue={order.billingAddressId ?? ""} /></label>
        <label>Shipping address ID<input name="shippingAddressId" defaultValue={order.shippingAddressId ?? ""} /></label>
        <label className="full">Terms<textarea name="terms" rows={3} defaultValue={order.terms ?? ""} /></label>
        <label className="full">Notes<textarea name="notes" rows={3} defaultValue={order.notes ?? ""} /></label>
        <fieldset className="full">
          <legend>Lines</legend>
          {[1, 2, 3, 4, 5].map((line) => {
            const current = order.lines[line - 1];
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
        <div className="full form-actions"><button type="submit">Save sales order</button></div>
      </form>
    </main>
  );
}
