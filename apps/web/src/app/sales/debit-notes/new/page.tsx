import { ModuleHeader } from "../../../../components/layout/ModuleHeader";
import { listItems, listUoms } from "../../../../features/master-data/api";
import { createSalesDebitNoteAction } from "../../../../features/sales/debit-notes/actions";
import { listSalesInvoices } from "../../../../features/sales/invoices/api";

export default async function NewSalesDebitNotePage() {
  const [invoices, items, uoms] = await Promise.all([
    listSalesInvoices({ status: "ISSUED", pageSize: "100" }),
    listItems({ pageSize: "100" }),
    listUoms({ pageSize: "100" }),
  ]);
  return (
    <main className="page-shell">
      <ModuleHeader title="Create Debit Note" eyebrow="Sales" description="Create a draft debit note against an issued, accounting-posted invoice." />
      <form action={createSalesDebitNoteAction} className="vercent-form">
        <label>Invoice<select name="salesInvoiceId" required><option value="">Select invoice</option>{invoices.rows.map((invoice) => <option key={invoice.id} value={invoice.id}>{invoice.invoiceNumber} - due {invoice.amountDue}</option>)}</select></label>
        <label>Debit note date<input name="debitNoteDate" type="date" /></label>
        <label>Posting date<input name="postingDate" type="date" /></label>
        <label>Reason<input name="reason" /></label>
        <label>Notes<textarea name="notes" /></label>
        <section className="table-panel">
          <h2>Additional charge lines</h2>
          {[0, 1, 2].map((index) => (
            <div className="line-grid" key={index}>
              <input name="salesInvoiceLineId" placeholder="Invoice line ID optional" />
              <select name="itemId"><option value="">Item</option>{items.rows.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select>
              <input name="description" placeholder="Description" />
              <input name="quantity" type="number" step="0.001" placeholder="Qty" />
              <select name="uomId"><option value="">UOM</option>{uoms.rows.map((uom) => <option key={uom.id} value={uom.id}>{uom.code}</option>)}</select>
              <input name="unitAmount" type="number" step="0.01" placeholder="Unit amount" />
              <input name="taxRate" type="number" step="0.01" placeholder="Tax %" />
            </div>
          ))}
        </section>
        <button className="vercent-button" type="submit">Create debit note</button>
      </form>
    </main>
  );
}
