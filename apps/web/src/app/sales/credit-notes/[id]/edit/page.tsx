import { ModuleHeader } from "../../../../../components/layout/ModuleHeader";
import { updateSalesCreditNoteAction } from "../../../../../features/sales/credit-notes/actions";
import { getSalesCreditNote } from "../../../../../features/sales/credit-notes/api";
import { listItems, listUoms } from "../../../../../features/master-data/api";
import { listWarehouses } from "../../../../../features/inventory/stock/api";

export default async function EditSalesCreditNotePage({ params }: { params: { id: string } }) {
  const [note, items, uoms, warehouses] = await Promise.all([getSalesCreditNote(params.id), listItems({ pageSize: "100" }), listUoms({ pageSize: "100" }), listWarehouses({ status: "ACTIVE", pageSize: "100" })]);
  if (note.status !== "DRAFT") {
    return <main className="page-shell"><ModuleHeader title="Credit note locked" eyebrow="Sales" description="Posted or cancelled credit notes cannot be edited." /></main>;
  }
  return (
    <main className="page-shell">
      <ModuleHeader title={`Edit ${note.creditNoteNumber}`} eyebrow="Sales Credit Note" description="Draft credit notes can be edited before posting." />
      <form action={updateSalesCreditNoteAction.bind(null, note.id)} className="vercent-form">
        <label>Credit note date<input name="creditNoteDate" type="date" defaultValue={note.creditNoteDate} /></label>
        <label>Posting date<input name="postingDate" type="date" defaultValue={note.postingDate ?? ""} /></label>
        <label>Reason<input name="reason" defaultValue={note.reason ?? ""} /></label>
        <label>Notes<textarea name="notes" defaultValue={note.notes ?? ""} /></label>
        <label><input name="returnToStock" type="checkbox" defaultChecked={note.returnToStock} /> Return to stock</label>
        <label>Warehouse<select name="warehouseId" defaultValue={note.warehouseId ?? ""}><option value="">No stock return</option>{warehouses.rows.map((warehouse) => <option key={warehouse.id} value={warehouse.id}>{warehouse.code} - {warehouse.name}</option>)}</select></label>
        <section className="table-panel">
          <h2>Lines</h2>
          {note.lines.map((line) => (
            <div className="line-grid" key={line.id}>
              <input name="salesInvoiceLineId" defaultValue={line.salesInvoiceLineId ?? ""} placeholder="Invoice line ID optional" />
              <select name="itemId" defaultValue={line.itemId}>{items.rows.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select>
              <input name="description" defaultValue={line.description ?? ""} />
              <input name="quantity" type="number" step="0.001" defaultValue={line.quantity} />
              <select name="uomId" defaultValue={line.uomId}>{uoms.rows.map((uom) => <option key={uom.id} value={uom.id}>{uom.code}</option>)}</select>
              <input name="unitPrice" type="number" step="0.01" defaultValue={line.unitPrice} />
              <input name="discountPercent" type="number" step="0.01" defaultValue="0" />
              <input name="taxRate" type="number" step="0.01" defaultValue="0" />
            </div>
          ))}
        </section>
        <button className="vercent-button" type="submit">Save changes</button>
      </form>
    </main>
  );
}
