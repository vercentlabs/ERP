"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createAddress, createCustomer, createItem, createParty, createSupplier, createUom, updateCustomer, updateItem, updateParty, updateSupplier } from "./api";

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

function partyPayload(formData: FormData) {
  return {
    partyType: String(formData.get("partyType") ?? "COMPANY"),
    displayName: String(formData.get("displayName") ?? "").trim(),
    legalName: optionalString(formData, "legalName"),
    gstin: optionalString(formData, "gstin"),
    pan: optionalString(formData, "pan"),
    email: optionalString(formData, "email"),
    phone: optionalString(formData, "phone"),
    website: optionalString(formData, "website"),
    status: optionalString(formData, "status") ?? "ACTIVE",
  };
}

export async function createPartyAction(formData: FormData) {
  const party = await createParty(partyPayload(formData));
  revalidatePath("/master-data/parties");
  redirect(`/master-data/parties/${party.id}`);
}

export async function updatePartyAction(id: string, formData: FormData) {
  await updateParty(id, partyPayload(formData));
  revalidatePath("/master-data/parties");
  revalidatePath(`/master-data/parties/${id}`);
  redirect(`/master-data/parties/${id}`);
}

export async function createAddressAction(partyId: string, formData: FormData) {
  await createAddress(partyId, {
    addressType: optionalString(formData, "addressType") ?? "REGISTERED",
    line1: String(formData.get("line1") ?? "").trim(),
    line2: optionalString(formData, "line2"),
    city: String(formData.get("city") ?? "").trim(),
    state: String(formData.get("state") ?? "").trim(),
    postalCode: String(formData.get("postalCode") ?? "").trim(),
    country: optionalString(formData, "country") ?? "IN",
    isDefaultBilling: booleanValue(formData, "isDefaultBilling"),
    isDefaultShipping: booleanValue(formData, "isDefaultShipping"),
  });
  revalidatePath(`/master-data/parties/${partyId}`);
}

function customerPayload(formData: FormData) {
  return {
    partyId: optionalString(formData, "partyId"),
    customerGroup: optionalString(formData, "customerGroup"),
    creditLimit: numberValue(formData, "creditLimit") ?? 0,
    paymentTerms: optionalString(formData, "paymentTerms"),
    currency: optionalString(formData, "currency") ?? "INR",
    gstTreatment: optionalString(formData, "gstTreatment"),
    status: optionalString(formData, "status") ?? "ACTIVE",
  };
}

export async function createCustomerAction(formData: FormData) {
  const customer = await createCustomer(customerPayload(formData));
  revalidatePath("/master-data/customers");
  redirect(`/master-data/customers/${customer.id}`);
}

export async function updateCustomerAction(id: string, formData: FormData) {
  await updateCustomer(id, customerPayload(formData));
  revalidatePath("/master-data/customers");
  revalidatePath(`/master-data/customers/${id}`);
  redirect(`/master-data/customers/${id}`);
}

function supplierPayload(formData: FormData) {
  return {
    partyId: optionalString(formData, "partyId"),
    supplierGroup: optionalString(formData, "supplierGroup"),
    paymentTerms: optionalString(formData, "paymentTerms"),
    currency: optionalString(formData, "currency") ?? "INR",
    gstTreatment: optionalString(formData, "gstTreatment"),
    rating: numberValue(formData, "rating"),
    status: optionalString(formData, "status") ?? "ACTIVE",
  };
}

export async function createSupplierAction(formData: FormData) {
  const supplier = await createSupplier(supplierPayload(formData));
  revalidatePath("/master-data/suppliers");
  redirect(`/master-data/suppliers/${supplier.id}`);
}

export async function updateSupplierAction(id: string, formData: FormData) {
  await updateSupplier(id, supplierPayload(formData));
  revalidatePath("/master-data/suppliers");
  revalidatePath(`/master-data/suppliers/${id}`);
  redirect(`/master-data/suppliers/${id}`);
}

export async function createUomAction(formData: FormData) {
  await createUom({
    code: String(formData.get("code") ?? "").trim(),
    name: String(formData.get("name") ?? "").trim(),
    category: optionalString(formData, "category"),
    precision: numberValue(formData, "precision") ?? 0,
    isBase: booleanValue(formData, "isBase"),
    status: optionalString(formData, "status") ?? "ACTIVE",
  });
  revalidatePath("/master-data/uoms");
}

function itemPayload(formData: FormData) {
  return {
    sku: optionalString(formData, "sku"),
    name: String(formData.get("name") ?? "").trim(),
    description: optionalString(formData, "description"),
    itemType: optionalString(formData, "itemType") ?? "PRODUCT",
    itemGroup: optionalString(formData, "itemGroup"),
    baseUomId: optionalString(formData, "baseUomId"),
    salesUomId: optionalString(formData, "salesUomId"),
    purchaseUomId: optionalString(formData, "purchaseUomId"),
    isStockItem: booleanValue(formData, "isStockItem"),
    isSalesItem: booleanValue(formData, "isSalesItem"),
    isPurchaseItem: booleanValue(formData, "isPurchaseItem"),
    isManufacturingItem: booleanValue(formData, "isManufacturingItem"),
    standardCost: numberValue(formData, "standardCost"),
    sellingPrice: numberValue(formData, "sellingPrice"),
    currency: optionalString(formData, "currency") ?? "INR",
    hsnSacCode: optionalString(formData, "hsnSacCode"),
    status: optionalString(formData, "status") ?? "ACTIVE",
  };
}

export async function createItemAction(formData: FormData) {
  const item = await createItem(itemPayload(formData));
  revalidatePath("/master-data/items");
  redirect(`/master-data/items/${item.id}`);
}

export async function updateItemAction(id: string, formData: FormData) {
  await updateItem(id, itemPayload(formData));
  revalidatePath("/master-data/items");
  revalidatePath(`/master-data/items/${id}`);
  redirect(`/master-data/items/${id}`);
}
