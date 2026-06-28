import { ModuleHeader } from "../../../../components/layout/ModuleHeader";
import { createDeliveryNoteAction } from "../../../../features/sales/delivery-notes/actions";

export default function NewDeliveryNotePage() {
  return (
    <main className="page-shell">
      <ModuleHeader title="New Delivery Note" eyebrow="Sales fulfillment" description="Create a draft delivery note against a confirmed sales order." />
      <form action={createDeliveryNoteAction} className="vercent-form">
        <label>Sales order ID<input name="salesOrderId" required /></label>
        <label>Delivery date<input name="deliveryDate" type="date" /></label>
        <label>Default warehouse ID<input name="warehouseId" /></label>
        <label>Shipping address ID<input name="shippingAddressId" /></label>
        <label>Carrier<input name="carrierName" /></label>
        <label>Tracking number<input name="trackingNumber" /></label>
        <label>Vehicle number<input name="vehicleNumber" /></label>
        <label>E-way bill number<input name="ewayBillNumber" /></label>
        <label>Notes<textarea name="notes" /></label>
        <section className="vercent-panel">
          <h2>Lines</h2>
          {[1, 2, 3, 4, 5].map((line) => (
            <div className="vercent-grid" key={line}>
              <label>Sales order line ID<input name={`line${line}SalesOrderLineId`} /></label>
              <label>Quantity<input name={`line${line}Quantity`} type="number" min="0" step="0.0001" /></label>
              <label>Warehouse ID<input name={`line${line}WarehouseId`} /></label>
              <label>Bin ID<input name={`line${line}BinId`} /></label>
            </div>
          ))}
        </section>
        <button type="submit">Create draft</button>
      </form>
    </main>
  );
}
