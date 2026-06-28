"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cancelSalesCreditNote, createCreditNoteFromInvoice, createSalesCreditNote, deleteSalesCreditNote, postSalesCreditNote, updateSalesCreditNote } from "./api";

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
    unitPrice: Number(formData.getAll("unitPrice")[index] || 0),
    discountPercent: Number(formData.getAll("discountPercent")[index] || 0),
    taxRate: Number(formData.getAll("taxRate")[index] || 0),
  })).filter((line) => line.itemId && line.uomId && line.quantity > 0);
}

export async function createSalesCreditNoteAction(formData: FormData) {
  const note = await createSalesCreditNote({ salesInvoiceId: value(formData, "salesInvoiceId"), creditNoteDate: value(formData, "creditNoteDate"), postingDate: value(formData, "postingDate") || undefined, reason: value(formData, "reason") || undefined, returnToStock: formData.get("returnToStock") === "on", warehouseId: value(formData, "warehouseId") || undefined, notes: value(formData, "notes") || undefined, lines: linesFromForm(formData) });
  revalidatePath("/sales/credit-notes");
  redirect(`/sales/credit-notes/${note.id}`);
}
export async function updateSalesCreditNoteAction(id: string, formData: FormData) {
  await updateSalesCreditNote(id, { creditNoteDate: value(formData, "creditNoteDate"), postingDate: value(formData, "postingDate") || undefined, reason: value(formData, "reason") || undefined, returnToStock: formData.get("returnToStock") === "on", warehouseId: value(formData, "warehouseId") || undefined, notes: value(formData, "notes") || undefined, lines: linesFromForm(formData) });
  revalidatePath(`/sales/credit-notes/${id}`);
  redirect(`/sales/credit-notes/${id}`);
}
export async function postSalesCreditNoteAction(id: string, formData: FormData) { await postSalesCreditNote(id, { postingDate: value(formData, "postingDate") || undefined }); revalidatePath(`/sales/credit-notes/${id}`); }
export async function cancelSalesCreditNoteAction(id: string) { await cancelSalesCreditNote(id); revalidatePath(`/sales/credit-notes/${id}`); }
export async function deleteSalesCreditNoteAction(id: string) { await deleteSalesCreditNote(id); revalidatePath("/sales/credit-notes"); redirect("/sales/credit-notes"); }
export async function createCreditNoteFromInvoiceAction(invoiceId: string, formData: FormData) {
  const note = await createCreditNoteFromInvoice(invoiceId, { creditNoteDate: value(formData, "creditNoteDate"), postingDate: value(formData, "postingDate") || undefined, reason: value(formData, "reason") || undefined, returnToStock: formData.get("returnToStock") === "on", warehouseId: value(formData, "warehouseId") || undefined, notes: value(formData, "notes") || undefined });
  revalidatePath(`/sales/invoices/${invoiceId}`);
  redirect(`/sales/credit-notes/${note.id}`);
}
