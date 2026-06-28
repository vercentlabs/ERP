"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cancelCustomerRefund, createCustomerRefund, createSalesCreditNoteRefund, deleteCustomerRefund, postCustomerRefund, updateCustomerRefund } from "./api";

const value = (formData: FormData, key: string) => String(formData.get(key) ?? "").trim();
const numberValue = (formData: FormData, key: string) => Number(value(formData, key) || 0);
function allocationsFromForm(formData: FormData) {
  const creditNoteIds = formData.getAll("creditNoteId").map(String);
  return creditNoteIds.map((creditNoteId, index) => ({ creditNoteId, amount: Number(formData.getAll("amount")[index] || 0) })).filter((allocation) => allocation.creditNoteId && allocation.amount > 0);
}
function payload(formData: FormData) {
  return {
    customerId: value(formData, "customerId"),
    refundDate: value(formData, "refundDate") || undefined,
    postingDate: value(formData, "postingDate") || undefined,
    paymentMethod: value(formData, "paymentMethod"),
    depositAccountId: value(formData, "depositAccountId"),
    totalAmount: numberValue(formData, "totalAmount"),
    referenceNumber: value(formData, "referenceNumber") || undefined,
    notes: value(formData, "notes") || undefined,
    allocations: allocationsFromForm(formData),
  };
}
export async function createCustomerRefundAction(formData: FormData) {
  const refund = await createCustomerRefund(payload(formData));
  revalidatePath("/finance/customer-refunds");
  redirect(`/finance/customer-refunds/${refund.id}`);
}
export async function updateCustomerRefundAction(id: string, formData: FormData) {
  await updateCustomerRefund(id, payload(formData));
  revalidatePath(`/finance/customer-refunds/${id}`);
  redirect(`/finance/customer-refunds/${id}`);
}
export async function postCustomerRefundAction(id: string, formData: FormData) {
  await postCustomerRefund(id, { postingDate: value(formData, "postingDate") || undefined });
  revalidatePath(`/finance/customer-refunds/${id}`);
}
export async function cancelCustomerRefundAction(id: string) {
  await cancelCustomerRefund(id);
  revalidatePath(`/finance/customer-refunds/${id}`);
}
export async function deleteCustomerRefundAction(id: string) {
  await deleteCustomerRefund(id);
  revalidatePath("/finance/customer-refunds");
  redirect("/finance/customer-refunds");
}
export async function createRefundFromCreditNoteAction(creditNoteId: string, formData: FormData) {
  const refund = await createSalesCreditNoteRefund(creditNoteId, {
    totalAmount: numberValue(formData, "totalAmount"),
    paymentMethod: value(formData, "paymentMethod") || "BANK_TRANSFER",
    depositAccountId: value(formData, "depositAccountId"),
    refundDate: value(formData, "refundDate") || undefined,
    postingDate: value(formData, "postingDate") || undefined,
    referenceNumber: value(formData, "referenceNumber") || undefined,
    notes: value(formData, "notes") || undefined,
  });
  revalidatePath(`/sales/credit-notes/${creditNoteId}`);
  redirect(`/finance/customer-refunds/${refund.id}`);
}
