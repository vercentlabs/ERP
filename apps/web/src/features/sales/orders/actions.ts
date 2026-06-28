"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { changeSalesOrderStatus, convertQuotationToSalesOrder, createSalesOrder, updateSalesOrder, type SalesOrderStatus } from "./api";

function optionalString(formData: FormData, key: string) {
  const value = String(formData.get(key) ?? "").trim();
  return value.length > 0 ? value : undefined;
}

function numberValue(formData: FormData, key: string, fallback = 0) {
  const value = optionalString(formData, key);
  return value ? Number(value) : fallback;
}

function orderPayload(formData: FormData) {
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
    .map((line) => ({ ...line, itemId: line.itemId ?? "", uomId: line.uomId ?? "" }));

  return {
    customerId: String(formData.get("customerId") ?? "").trim(),
    quotationId: optionalString(formData, "quotationId"),
    opportunityId: optionalString(formData, "opportunityId"),
    orderDate: optionalString(formData, "orderDate"),
    expectedDeliveryDate: optionalString(formData, "expectedDeliveryDate"),
    currency: optionalString(formData, "currency") ?? "INR",
    exchangeRate: numberValue(formData, "exchangeRate", 1),
    billingAddressId: optionalString(formData, "billingAddressId"),
    shippingAddressId: optionalString(formData, "shippingAddressId"),
    terms: optionalString(formData, "terms"),
    notes: optionalString(formData, "notes"),
    lines,
  };
}

export async function createSalesOrderAction(formData: FormData) {
  const order = await createSalesOrder(orderPayload(formData));
  revalidatePath("/sales/orders");
  redirect(`/sales/orders/${order.id}`);
}

export async function updateSalesOrderAction(id: string, formData: FormData) {
  await updateSalesOrder(id, orderPayload(formData));
  revalidatePath("/sales/orders");
  revalidatePath(`/sales/orders/${id}`);
  redirect(`/sales/orders/${id}`);
}

export async function changeSalesOrderStatusAction(id: string, formData: FormData) {
  await changeSalesOrderStatus(id, { status: String(formData.get("status")) as SalesOrderStatus });
  revalidatePath("/sales/orders");
  revalidatePath(`/sales/orders/${id}`);
}

export async function convertQuotationToSalesOrderAction(quotationId: string, formData: FormData) {
  const order = await convertQuotationToSalesOrder(quotationId, {
    orderDate: optionalString(formData, "orderDate"),
    expectedDeliveryDate: optionalString(formData, "expectedDeliveryDate"),
    notes: optionalString(formData, "notes"),
  });
  revalidatePath("/sales/quotations");
  revalidatePath(`/sales/quotations/${quotationId}`);
  redirect(`/sales/orders/${order.id}`);
}
