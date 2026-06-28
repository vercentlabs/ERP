"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createOpeningStock, createStockAdjustment, createWarehouse, createWarehouseBin, setDefaultBin, setDefaultWarehouse, updateWarehouse } from "./api";

function optionalString(formData: FormData, key: string) {
  const value = String(formData.get(key) ?? "").trim();
  return value.length > 0 ? value : undefined;
}

function numberValue(formData: FormData, key: string) {
  const value = optionalString(formData, key);
  return value ? Number(value) : undefined;
}

function booleanValue(formData: FormData, key: string) {
  return formData.get(key) === "on";
}

function warehousePayload(formData: FormData) {
  return {
    name: String(formData.get("name") ?? "").trim(),
    code: String(formData.get("code") ?? "").trim(),
    type: optionalString(formData, "type") ?? "MAIN",
    status: optionalString(formData, "status") ?? "ACTIVE",
    addressId: optionalString(formData, "addressId"),
    managerUserId: optionalString(formData, "managerUserId"),
    isDefault: booleanValue(formData, "isDefault"),
    notes: optionalString(formData, "notes"),
  };
}

export async function createWarehouseAction(formData: FormData) {
  const warehouse = await createWarehouse(warehousePayload(formData));
  revalidatePath("/inventory/warehouses");
  redirect(`/inventory/warehouses/${warehouse.id}`);
}

export async function updateWarehouseAction(id: string, formData: FormData) {
  await updateWarehouse(id, warehousePayload(formData));
  revalidatePath("/inventory/warehouses");
  revalidatePath(`/inventory/warehouses/${id}`);
  redirect(`/inventory/warehouses/${id}`);
}

export async function setDefaultWarehouseAction(id: string) {
  await setDefaultWarehouse(id);
  revalidatePath("/inventory/warehouses");
  revalidatePath(`/inventory/warehouses/${id}`);
}

export async function createWarehouseBinAction(warehouseId: string, formData: FormData) {
  await createWarehouseBin(warehouseId, {
    code: String(formData.get("code") ?? "").trim(),
    name: String(formData.get("name") ?? "").trim(),
    zone: optionalString(formData, "zone"),
    aisle: optionalString(formData, "aisle"),
    rack: optionalString(formData, "rack"),
    shelf: optionalString(formData, "shelf"),
    status: optionalString(formData, "status") ?? "ACTIVE",
    isDefault: booleanValue(formData, "isDefault"),
  });
  revalidatePath(`/inventory/warehouses/${warehouseId}/bins`);
  revalidatePath(`/inventory/warehouses/${warehouseId}`);
}

export async function setDefaultBinAction(warehouseId: string, binId: string) {
  await setDefaultBin(binId);
  revalidatePath(`/inventory/warehouses/${warehouseId}/bins`);
}

function movementPayload(formData: FormData) {
  return {
    itemId: String(formData.get("itemId") ?? "").trim(),
    warehouseId: String(formData.get("warehouseId") ?? "").trim(),
    binId: optionalString(formData, "binId"),
    postingDate: optionalString(formData, "postingDate"),
    quantity: Number(formData.get("quantity") ?? 0),
    uomId: optionalString(formData, "uomId"),
    unitCost: numberValue(formData, "unitCost"),
    remarks: optionalString(formData, "remarks"),
  };
}

export async function createOpeningStockAction(formData: FormData) {
  await createOpeningStock(movementPayload(formData));
  revalidatePath("/inventory/stock");
  revalidatePath("/inventory/stock/ledger");
  redirect("/inventory/stock");
}

export async function createStockAdjustmentAction(formData: FormData) {
  await createStockAdjustment({ ...movementPayload(formData), adjustmentType: String(formData.get("adjustmentType") ?? "IN") });
  revalidatePath("/inventory/stock");
  revalidatePath("/inventory/stock/ledger");
  redirect("/inventory/stock");
}
