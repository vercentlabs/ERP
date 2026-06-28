import { ModuleHeader } from "../../../../../components/layout/ModuleHeader";
import { listItems, listUoms } from "../../../../../features/master-data/api";
import { updateSalesDebitNoteAction } from "../../../../../features/sales/debit-notes/actions";
import { getSalesDebitNote } from "../../../../../features/sales/debit-notes/api";

export default async function EditSalesDebitNotePage({ params }: { params: { id: string } }) {
  const [note, items, uoms] = await Promise.all([getSalesDebitNote(params.id), listItems({ pageSize: "100" }), listUoms({ pageSize: "100" })]);
  if (note.status !== "DRAFT") {
    return <main className="page-shell"><ModuleHeader title="Debit note locked" eyebrow="Sales" description="Posted or cancelled debit notes cannot be edited." /></main>;
  }
  return (
    <main className="page-shell">
      <ModuleHeader title={`Edit ${note.debitNoteNumber}`} eyebrow="Sales Debit Note" description="Draft debit notes can be edited before posting." />
      <form action={updateSalesDebitNoteAction.bind(null, note.id)} className="vercent-form">
        <label>Debit note date<input name="debitNoteDate" type="date" defaultValue={note.debitNoteDate} /></label>
        <label>Posting date<input name="postingDate" type="date" defaultValue={note.postingDate ?? ""} /></label>
        <label>Reason<input name="reason" defaultValue={note.reason ?? ""} /></label>
        <label>Notes<textarea name="notes" defaultValue={note.notes ?? ""} /></label>
        <section className="table-panel">
          <h2>Lines</h2>
          {note.lines.map((line) => (
            <div className="line-grid" key={line.id}>
              <input name="salesInvoiceLineId" defaultValue={line.salesInvoiceLineId ?? ""} placeholder="Invoice line ID optional" />
              <select name="itemId" defaultValue={line.itemId}>{items.rows.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select>
              <input name="description" defaultValue={line.description ?? ""} />
              <input name="quantity" type="number" step="0.001" defaultValue={line.quantity} />
              <select name="uomId" defaultValue={line.uomId}>{uoms.rows.map((uom) => <option key={uom.id} value={uom.id}>{uom.code}</option>)}</select>
              <input name="unitAmount" type="number" step="0.01" defaultValue={line.unitAmount} />
              <input name="taxRate" type="number" step="0.01" defaultValue={line.taxRate} />
            </div>
          ))}
        </section>
        <button className="vercent-button" type="submit">Save changes</button>
      </form>
    </main>
  );
}
