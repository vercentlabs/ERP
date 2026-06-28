import { ModuleHeader } from "../../../../../components/layout/ModuleHeader";
import { updateDeliveryNoteAction } from "../../../../../features/sales/delivery-notes/actions";
import { getDeliveryNote } from "../../../../../features/sales/delivery-notes/api";

export default async function EditDeliveryNotePage({ params }: { params: { id: string } }) {
  const note = await getDeliveryNote(params.id);
  const action = updateDeliveryNoteAction.bind(null, note.id);
  if (note.status !== "DRAFT") {
    return (
      <main className="page-shell">
        <ModuleHeader title="Delivery note locked" eyebrow="Sales fulfillment" description="Posted or cancelled delivery notes cannot be edited." />
      </main>
    );
  }
  return (
    <main className="page-shell">
      <ModuleHeader title={`Edit ${note.deliveryNoteNumber}`} eyebrow="Sales fulfillment" description="Edit draft delivery note details and quantities." />
      <form action={action} className="vercent-form">
        <input type="hidden" name="salesOrderId" value={note.salesOrderId} />
        <label>Delivery date<input name="deliveryDate" type="date" defaultValue={note.deliveryDate} /></label>
        <label>Default warehouse ID<input name="warehouseId" defaultValue={note.warehouseId ?? ""} /></label>
        <label>Carrier<input name="carrierName" defaultValue={note.carrierName ?? ""} /></label>
        <label>Tracking number<input name="trackingNumber" defaultValue={note.trackingNumber ?? ""} /></label>
        <label>Vehicle number<input name="vehicleNumber" defaultValue={note.vehicleNumber ?? ""} /></label>
        <label>E-way bill number<input name="ewayBillNumber" defaultValue={note.ewayBillNumber ?? ""} /></label>
        <label>Notes<textarea name="notes" defaultValue={note.notes ?? ""} /></label>
        <section className="vercent-panel">
          <h2>Lines</h2>
          {note.lines.map((line, index) => (
            <div className="vercent-grid" key={line.id}>
              <label>Sales order line ID<input name={`line${index + 1}SalesOrderLineId`} defaultValue={line.salesOrderLineId} /></label>
              <label>Quantity<input name={`line${index + 1}Quantity`} type="number" min="0" step="0.0001" defaultValue={line.quantity} /></label>
              <label>Warehouse ID<input name={`line${index + 1}WarehouseId`} defaultValue={line.warehouseId ?? ""} /></label>
              <label>Bin ID<input name={`line${index + 1}BinId`} defaultValue={line.binId ?? ""} /></label>
            </div>
          ))}
        </section>
        <button type="submit">Save draft</button>
      </form>
    </main>
  );
}
