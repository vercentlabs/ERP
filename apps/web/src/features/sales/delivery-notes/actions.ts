"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cancelDeliveryNote, createDeliveryNote, createDeliveryNoteFromSalesOrder, postDeliveryNote, updateDeliveryNote } from "./api";

function optionalString(formData: FormData, key: string) {
  const value = String(formData.get(key) ?? "").trim();
  return value.length > 0 ? value : undefined;
}

function numberValue(formData: FormData, key: string, fallback = 0) {
  const value = optionalString(formData, key);
  return value ? Number(value) : fallback;
}

function deliveryPayload(formData: FormData) {
  const lines = Array.from({ length: 10 }, (_, index) => index + 1)
    .map((line) => ({
      salesOrderLineId: optionalString(formData, `line${line}SalesOrderLineId`),
      quantity: numberValue(formData, `line${line}Quantity`, 0),
      warehouseId: optionalString(formData, `line${line}WarehouseId`) ?? optionalString(formData, "warehouseId"),
      binId: optionalString(formData, `line${line}BinId`),
    }))
    .filter((line) => line.salesOrderLineId && line.quantity > 0)
    .map((line) => ({ ...line, salesOrderLineId: line.salesOrderLineId ?? "" }));

  return {
    salesOrderId: optionalString(formData, "salesOrderId"),
    deliveryDate: optionalString(formData, "deliveryDate"),
    shippingAddressId: optionalString(formData, "shippingAddressId"),
    warehouseId: optionalString(formData, "warehouseId"),
    carrierName: optionalString(formData, "carrierName"),
    trackingNumber: optionalString(formData, "trackingNumber"),
    vehicleNumber: optionalString(formData, "vehicleNumber"),
    ewayBillNumber: optionalString(formData, "ewayBillNumber"),
    notes: optionalString(formData, "notes"),
    lines,
  };
}

export async function createDeliveryNoteAction(formData: FormData) {
  const note = await createDeliveryNote(deliveryPayload(formData));
  revalidatePath("/sales/delivery-notes");
  redirect(`/sales/delivery-notes/${note.id}`);
}

export async function createDeliveryNoteFromSalesOrderAction(orderId: string, formData: FormData) {
  const note = await createDeliveryNoteFromSalesOrder(orderId, {
    deliveryDate: optionalString(formData, "deliveryDate"),
    warehouseId: optionalString(formData, "warehouseId"),
    notes: optionalString(formData, "notes"),
  });
  revalidatePath(`/sales/orders/${orderId}`);
  redirect(`/sales/delivery-notes/${note.id}`);
}

export async function updateDeliveryNoteAction(id: string, formData: FormData) {
  await updateDeliveryNote(id, deliveryPayload(formData));
  revalidatePath("/sales/delivery-notes");
  revalidatePath(`/sales/delivery-notes/${id}`);
  redirect(`/sales/delivery-notes/${id}`);
}

export async function postDeliveryNoteAction(id: string, formData: FormData) {
  await postDeliveryNote(id, { postingDate: optionalString(formData, "postingDate") });
  revalidatePath("/sales/delivery-notes");
  revalidatePath(`/sales/delivery-notes/${id}`);
}

export async function cancelDeliveryNoteAction(id: string) {
  await cancelDeliveryNote(id);
  revalidatePath("/sales/delivery-notes");
  revalidatePath(`/sales/delivery-notes/${id}`);
}
