"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { changeQuotationStatus, createQuotation, updateQuotation, type QuotationStatus } from "./api";

function optionalString(formData: FormData, key: string) {
  const value = String(formData.get(key) ?? "").trim();
  return value.length > 0 ? value : undefined;
}

function numberValue(formData: FormData, key: string, fallback = 0) {
  const value = optionalString(formData, key);
  return value ? Number(value) : fallback;
}

function quotationPayload(formData: FormData) {
  const lines = Array.from({ length: 5 }, (_, index) => index + 1)
    .map((line) => ({
      itemId: optionalString(formData, `line${line}ItemId`),
      description: optionalString(formData, `line${line}Description`),
      quantity: numberValue(formData, `line${line}Quantity`, 0),
      uomId: optionalString(formData, `line${line}UomId`),
      unitPrice: numberValue(formData, `line${line}UnitPrice`, 0),
      discountPercent: numberValue(formData, `line${line}DiscountPercent`, 0),
      taxRate: numberValue(formData, `line${line}TaxRate`, 0),
    }))
    .filter((line) => line.itemId && line.uomId && line.quantity > 0)
    .map((line) => ({
      ...line,
      itemId: line.itemId ?? "",
      uomId: line.uomId ?? "",
    }));

  return {
    customerId: String(formData.get("customerId") ?? "").trim(),
    opportunityId: optionalString(formData, "opportunityId"),
    quoteDate: optionalString(formData, "quoteDate"),
    validUntil: String(formData.get("validUntil") ?? "").trim(),
    currency: optionalString(formData, "currency") ?? "INR",
    exchangeRate: numberValue(formData, "exchangeRate", 1),
    billingAddressId: optionalString(formData, "billingAddressId"),
    shippingAddressId: optionalString(formData, "shippingAddressId"),
    terms: optionalString(formData, "terms"),
    notes: optionalString(formData, "notes"),
    lines,
  };
}

export async function createQuotationAction(formData: FormData) {
  const quotation = await createQuotation(quotationPayload(formData));
  revalidatePath("/sales/quotations");
  redirect(`/sales/quotations/${quotation.id}`);
}

export async function updateQuotationAction(id: string, formData: FormData) {
  await updateQuotation(id, quotationPayload(formData));
  revalidatePath("/sales/quotations");
  revalidatePath(`/sales/quotations/${id}`);
  redirect(`/sales/quotations/${id}`);
}

export async function changeQuotationStatusAction(id: string, formData: FormData) {
  await changeQuotationStatus(id, {
    status: String(formData.get("status")) as QuotationStatus,
    rejectionReason: optionalString(formData, "rejectionReason"),
  });
  revalidatePath("/sales/quotations");
  revalidatePath(`/sales/quotations/${id}`);
}
