import { ModuleHeader } from "../../../../components/layout/ModuleHeader";
import { createSalesCreditNoteAction } from "../../../../features/sales/credit-notes/actions";
import { listSalesInvoices } from "../../../../features/sales/invoices/api";
import { listItems, listUoms } from "../../../../features/master-data/api";
import { listWarehouses } from "../../../../features/inventory/stock/api";

export default async function NewSalesCreditNotePage() {
  const [invoices, items, uoms, warehouses] = await Promise.all([
    listSalesInvoices({ status: "ISSUED", pageSize: "100" }),
    listItems({ pageSize: "100" }),
    listUoms({ pageSize: "100" }),
    listWarehouses({ status: "ACTIVE", pageSize: "100" }),
  ]);
  return (
    <main className="page-shell">
      <ModuleHeader title="Create Credit Note" eyebrow="Sales" description="Create a draft credit note against an issued, accounting-posted invoice." />
      <form action={createSalesCreditNoteAction} className="vercent-form">
        <label>Invoice<select name="salesInvoiceId" required><option value="">Select invoice</option>{invoices.rows.map((invoice) => <option key={invoice.id} value={invoice.id}>{invoice.invoiceNumber} - due {invoice.amountDue}</option>)}</select></label>
        <label>Credit note date<input name="creditNoteDate" type="date" /></label>
        <label>Posting date<input name="postingDate" type="date" /></label>
        <label>Reason<input name="reason" /></label>
        <label>Notes<textarea name="notes" /></label>
        <label><input name="returnToStock" type="checkbox" /> Return to stock</label>
        <label>Warehouse<select name="warehouseId"><option value="">No stock return</option>{warehouses.rows.map((warehouse) => <option key={warehouse.id} value={warehouse.id}>{warehouse.code} - {warehouse.name}</option>)}</select></label>
        <section className="table-panel">
          <h2>Lines</h2>
          {[0, 1, 2].map((index) => (
            <div className="line-grid" key={index}>
              <input name="salesInvoiceLineId" placeholder="Invoice line ID optional" />
              <select name="itemId"><option value="">Item</option>{items.rows.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select>
              <input name="description" placeholder="Description" />
              <input name="quantity" type="number" step="0.001" placeholder="Qty" />
              <select name="uomId"><option value="">UOM</option>{uoms.rows.map((uom) => <option key={uom.id} value={uom.id}>{uom.code}</option>)}</select>
              <input name="unitPrice" type="number" step="0.01" placeholder="Unit price" />
              <input name="discountPercent" type="number" step="0.01" placeholder="Disc %" />
              <input name="taxRate" type="number" step="0.01" placeholder="Tax %" />
            </div>
          ))}
        </section>
        <button className="vercent-button" type="submit">Create credit note</button>
      </form>
    </main>
  );
}
