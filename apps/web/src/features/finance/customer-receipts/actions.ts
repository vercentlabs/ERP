"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cancelCustomerReceipt, createCustomerReceipt, createSalesInvoiceReceipt, deleteCustomerReceipt, postCustomerReceipt, updateCustomerReceipt } from "./api";

const value = (formData: FormData, key: string) => String(formData.get(key) ?? "").trim();
const numberValue = (formData: FormData, key: string) => Number(value(formData, key) || 0);
function allocationsFromForm(formData: FormData) {
  const invoiceIds = formData.getAll("salesInvoiceId").map(String);
  return invoiceIds.map((salesInvoiceId, index) => ({ salesInvoiceId, allocatedAmount: Number(formData.getAll("allocatedAmount")[index] || 0) })).filter((allocation) => allocation.salesInvoiceId && allocation.allocatedAmount > 0);
}
function payload(formData: FormData) {
  return {
    customerId: value(formData, "customerId"),
    receiptDate: value(formData, "receiptDate") || undefined,
    postingDate: value(formData, "postingDate") || undefined,
    paymentMethod: value(formData, "paymentMethod"),
    depositAccountId: value(formData, "depositAccountId"),
    referenceNumber: value(formData, "referenceNumber") || undefined,
    referenceDate: value(formData, "referenceDate") || undefined,
    amountReceived: numberValue(formData, "amountReceived"),
    currency: value(formData, "currency") || "INR",
    exchangeRate: numberValue(formData, "exchangeRate") || 1,
    notes: value(formData, "notes") || undefined,
    allocations: allocationsFromForm(formData),
  };
}
export async function createCustomerReceiptAction(formData: FormData) {
  const receipt = await createCustomerReceipt(payload(formData));
  revalidatePath("/finance/customer-receipts");
  redirect(`/finance/customer-receipts/${receipt.id}`);
}
export async function updateCustomerReceiptAction(id: string, formData: FormData) {
  await updateCustomerReceipt(id, payload(formData));
  revalidatePath(`/finance/customer-receipts/${id}`);
  redirect(`/finance/customer-receipts/${id}`);
}
export async function postCustomerReceiptAction(id: string, formData: FormData) {
  await postCustomerReceipt(id, { postingDate: value(formData, "postingDate") || undefined });
  revalidatePath(`/finance/customer-receipts/${id}`);
}
export async function cancelCustomerReceiptAction(id: string) {
  await cancelCustomerReceipt(id);
  revalidatePath(`/finance/customer-receipts/${id}`);
}
export async function deleteCustomerReceiptAction(id: string) {
  await deleteCustomerReceipt(id);
  revalidatePath("/finance/customer-receipts");
  redirect("/finance/customer-receipts");
}
export async function createReceiptFromInvoiceAction(invoiceId: string, formData: FormData) {
  const receipt = await createSalesInvoiceReceipt(invoiceId, {
    amountReceived: numberValue(formData, "amountReceived"),
    paymentMethod: value(formData, "paymentMethod") || "BANK_TRANSFER",
    depositAccountId: value(formData, "depositAccountId"),
    receiptDate: value(formData, "receiptDate") || undefined,
    postingDate: value(formData, "postingDate") || undefined,
    referenceNumber: value(formData, "referenceNumber") || undefined,
    referenceDate: value(formData, "referenceDate") || undefined,
    notes: value(formData, "notes") || undefined,
  });
  revalidatePath(`/sales/invoices/${invoiceId}`);
  redirect(`/finance/customer-receipts/${receipt.id}`);
}
