"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cancelSalesInvoice, createInvoiceFromDeliveryNote, createInvoiceFromSalesOrder, createSalesInvoice, issueSalesInvoice, postSalesInvoiceAccounting, updateSalesInvoice } from "./api";
function optionalString(formData: FormData, key: string) { const value = String(formData.get(key) ?? "").trim(); return value.length > 0 ? value : undefined; }
function numberValue(formData: FormData, key: string, fallback = 0) { const value = optionalString(formData, key); return value ? Number(value) : fallback; }
function payload(formData: FormData) {
  const lines = Array.from({ length: 8 }, (_, index) => index + 1).map((line) => ({
    itemId: optionalString(formData, `line${line}ItemId`), description: optionalString(formData, `line${line}Description`), quantity: numberValue(formData, `line${line}Quantity`, 0),
    uomId: optionalString(formData, `line${line}UomId`), unitPrice: numberValue(formData, `line${line}UnitPrice`, 0), discountPercent: numberValue(formData, `line${line}DiscountPercent`, 0), taxRate: numberValue(formData, `line${line}TaxRate`, 0),
  })).filter((line) => line.itemId && line.uomId && line.quantity > 0).map((line) => ({ ...line, itemId: line.itemId ?? "", uomId: line.uomId ?? "" }));
  return { customerId: optionalString(formData, "customerId"), salesOrderId: optionalString(formData, "salesOrderId"), deliveryNoteId: optionalString(formData, "deliveryNoteId"), invoiceDate: optionalString(formData, "invoiceDate"), dueDate: optionalString(formData, "dueDate"), currency: optionalString(formData, "currency") ?? "INR", billingAddressId: optionalString(formData, "billingAddressId"), shippingAddressId: optionalString(formData, "shippingAddressId"), terms: optionalString(formData, "terms"), notes: optionalString(formData, "notes"), lines };
}
export async function createSalesInvoiceAction(formData: FormData) { const invoice = await createSalesInvoice(payload(formData)); revalidatePath("/sales/invoices"); redirect(`/sales/invoices/${invoice.id}`); }
export async function updateSalesInvoiceAction(id: string, formData: FormData) { await updateSalesInvoice(id, payload(formData)); revalidatePath("/sales/invoices"); revalidatePath(`/sales/invoices/${id}`); redirect(`/sales/invoices/${id}`); }
export async function issueSalesInvoiceAction(id: string, formData: FormData) { await issueSalesInvoice(id, { invoiceDate: optionalString(formData, "invoiceDate") }); revalidatePath("/sales/invoices"); revalidatePath(`/sales/invoices/${id}`); }
export async function cancelSalesInvoiceAction(id: string) { await cancelSalesInvoice(id); revalidatePath("/sales/invoices"); revalidatePath(`/sales/invoices/${id}`); }
export async function postSalesInvoiceAccountingAction(id: string, formData: FormData) { await postSalesInvoiceAccounting(id, { postingDate: optionalString(formData, "postingDate") }); revalidatePath("/sales/invoices"); revalidatePath(`/sales/invoices/${id}`); }
export async function createInvoiceFromDeliveryNoteAction(deliveryNoteId: string, formData: FormData) { const invoice = await createInvoiceFromDeliveryNote(deliveryNoteId, { invoiceDate: optionalString(formData, "invoiceDate"), dueDate: optionalString(formData, "dueDate"), notes: optionalString(formData, "notes") }); revalidatePath(`/sales/delivery-notes/${deliveryNoteId}`); redirect(`/sales/invoices/${invoice.id}`); }
export async function createInvoiceFromSalesOrderAction(orderId: string, formData: FormData) { const invoice = await createInvoiceFromSalesOrder(orderId, { invoiceDate: optionalString(formData, "invoiceDate"), dueDate: optionalString(formData, "dueDate"), notes: optionalString(formData, "notes") }); revalidatePath(`/sales/orders/${orderId}`); redirect(`/sales/invoices/${invoice.id}`); }
