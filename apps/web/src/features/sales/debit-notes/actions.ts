"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cancelSalesDebitNote, createDebitNoteFromInvoice, createSalesDebitNote, deleteSalesDebitNote, postSalesDebitNote, updateSalesDebitNote } from "./api";

const value = (formData: FormData, key: string) => String(formData.get(key) ?? "").trim();
function linesFromForm(formData: FormData) {
  const itemIds = formData.getAll("itemId").map(String);
  return itemIds.map((itemId, index) => ({
    salesInvoiceLineId: String(formData.getAll("salesInvoiceLineId")[index] ?? "") || undefined,
    itemId,
    itemName: String(formData.getAll("itemName")[index] ?? "") || undefined,
    description: String(formData.getAll("description")[index] ?? "") || undefined,
    quantity: Number(formData.getAll("quantity")[index] || 0),
    uomId: String(formData.getAll("uomId")[index] ?? ""),
    unitAmount: Number(formData.getAll("unitAmount")[index] || 0),
    taxRate: Number(formData.getAll("taxRate")[index] || 0),
  })).filter((line) => line.itemId && line.uomId && line.quantity > 0);
}

export async function createSalesDebitNoteAction(formData: FormData) {
  const note = await createSalesDebitNote({ salesInvoiceId: value(formData, "salesInvoiceId"), debitNoteDate: value(formData, "debitNoteDate"), postingDate: value(formData, "postingDate") || undefined, reason: value(formData, "reason") || undefined, notes: value(formData, "notes") || undefined, lines: linesFromForm(formData) });
  revalidatePath("/sales/debit-notes");
  redirect(`/sales/debit-notes/${note.id}`);
}
export async function updateSalesDebitNoteAction(id: string, formData: FormData) {
  await updateSalesDebitNote(id, { debitNoteDate: value(formData, "debitNoteDate"), postingDate: value(formData, "postingDate") || undefined, reason: value(formData, "reason") || undefined, notes: value(formData, "notes") || undefined, lines: linesFromForm(formData) });
  revalidatePath(`/sales/debit-notes/${id}`);
  redirect(`/sales/debit-notes/${id}`);
}
export async function postSalesDebitNoteAction(id: string, formData: FormData) { await postSalesDebitNote(id, { postingDate: value(formData, "postingDate") || undefined }); revalidatePath(`/sales/debit-notes/${id}`); }
export async function cancelSalesDebitNoteAction(id: string) { await cancelSalesDebitNote(id); revalidatePath(`/sales/debit-notes/${id}`); }
export async function deleteSalesDebitNoteAction(id: string) { await deleteSalesDebitNote(id); revalidatePath("/sales/debit-notes"); redirect("/sales/debit-notes"); }
export async function createDebitNoteFromInvoiceAction(invoiceId: string, formData: FormData) {
  const note = await createDebitNoteFromInvoice(invoiceId, { debitNoteDate: value(formData, "debitNoteDate"), postingDate: value(formData, "postingDate") || undefined, reason: value(formData, "reason") || undefined, notes: value(formData, "notes") || undefined });
  revalidatePath(`/sales/invoices/${invoiceId}`);
  redirect(`/sales/debit-notes/${note.id}`);
}
