import Link from "next/link";
import { ModuleHeader } from "../../../../components/layout/ModuleHeader";
import { cancelCustomerReceiptAction, deleteCustomerReceiptAction, postCustomerReceiptAction } from "../../../../features/finance/customer-receipts/actions";
import { getCustomerReceipt } from "../../../../features/finance/customer-receipts/api";

export default async function CustomerReceiptDetailPage({ params }: { params: { id: string } }) {
  const receipt = await getCustomerReceipt(params.id);
  return (
    <main className="page-shell">
      <ModuleHeader title={receipt.receiptNumber} eyebrow="Customer Receipts" description={`Collection from customer ${receipt.customerId}`} actions={<>{receipt.status === "DRAFT" ? <Link className="vercent-button" href={`/finance/customer-receipts/${receipt.id}/edit`}>Edit</Link> : null}<Link className="vercent-button secondary" href="/finance/customer-receipts">Back</Link></>} />
      <section className="grid-panel">
        <article className="metric-card"><span>Status</span><strong>{receipt.status}</strong></article><article className="metric-card"><span>Method</span><strong>{receipt.paymentMethod}</strong></article><article className="metric-card"><span>Received</span><strong>{receipt.currency} {receipt.amountReceived.toLocaleString("en-IN")}</strong></article><article className="metric-card"><span>Allocated</span><strong>{receipt.allocatedAmount.toLocaleString("en-IN")}</strong></article>
        <article className="metric-card"><span>Journal</span><strong>{receipt.journalEntryId ? <Link href={`/finance/journal-entries/${receipt.journalEntryId}`}>{receipt.journalEntryId}</Link> : "-"}</strong></article><article className="metric-card"><span>Deposit account</span><strong>{receipt.depositAccountId}</strong></article>
      </section>
      <section className="vercent-table-wrap"><table className="vercent-table"><thead><tr><th>Invoice</th><th>Total</th><th>Due before</th><th>Allocated</th><th>Due after</th></tr></thead><tbody>{receipt.allocations.map((allocation) => <tr key={allocation.id}><td><Link href={`/sales/invoices/${allocation.salesInvoiceId}`}>{allocation.invoiceNumber}</Link></td><td>{allocation.invoiceTotalAmount.toLocaleString("en-IN")}</td><td>{allocation.invoiceAmountDueBefore.toLocaleString("en-IN")}</td><td>{allocation.allocatedAmount.toLocaleString("en-IN")}</td><td>{allocation.invoiceAmountDueAfter.toLocaleString("en-IN")}</td></tr>)}</tbody></table></section>
      {receipt.status === "DRAFT" ? <section className="vercent-panel"><h2>Actions</h2><form action={postCustomerReceiptAction.bind(null, receipt.id)} className="vercent-toolbar"><input name="postingDate" type="date" defaultValue={receipt.postingDate ?? receipt.receiptDate} /><button type="submit">Post receipt</button></form><form action={cancelCustomerReceiptAction.bind(null, receipt.id)}><button type="submit">Cancel draft</button></form><form action={deleteCustomerReceiptAction.bind(null, receipt.id)}><button type="submit">Delete draft</button></form></section> : null}
      <section className="vercent-panel"><h2>Notes</h2><p>{receipt.notes ?? "No notes recorded."}</p><p>Posted receipt reversal, refunds, and bank reconciliation are not implemented yet.</p></section>
    </main>
  );
}
