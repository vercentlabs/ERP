"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { assignLead, changeLeadStatus, convertLead, createLead, updateLead, type LeadStatus } from "./api";

function optionalString(formData: FormData, key: string) {
  const value = String(formData.get(key) ?? "").trim();
  return value.length > 0 ? value : undefined;
}

function numberValue(formData: FormData, key: string) {
  const value = optionalString(formData, key);
  return value ? Number(value) : undefined;
}

function leadPayload(formData: FormData) {
  return {
    firstName: String(formData.get("firstName") ?? "").trim(),
    lastName: String(formData.get("lastName") ?? "").trim(),
    companyName: optionalString(formData, "companyName"),
    email: optionalString(formData, "email"),
    phone: optionalString(formData, "phone"),
    source: optionalString(formData, "source"),
    expectedValue: numberValue(formData, "expectedValue"),
    currency: optionalString(formData, "currency") ?? "INR",
    notes: optionalString(formData, "notes"),
  };
}

export async function createLeadAction(formData: FormData) {
  const lead = await createLead(leadPayload(formData));
  revalidatePath("/crm/leads");
  redirect(`/crm/leads/${lead.id}`);
}

export async function updateLeadAction(id: string, formData: FormData) {
  await updateLead(id, leadPayload(formData));
  revalidatePath("/crm/leads");
  revalidatePath(`/crm/leads/${id}`);
  redirect(`/crm/leads/${id}`);
}

export async function changeLeadStatusAction(id: string, formData: FormData) {
  await changeLeadStatus(id, String(formData.get("status")) as LeadStatus);
  revalidatePath("/crm/leads");
  revalidatePath(`/crm/leads/${id}`);
}

export async function assignLeadAction(id: string, formData: FormData) {
  await assignLead(id, {
    ownerUserId: optionalString(formData, "ownerUserId"),
    assignedTeamId: optionalString(formData, "assignedTeamId"),
  });
  revalidatePath("/crm/leads");
  revalidatePath(`/crm/leads/${id}`);
}

function addressPayload(formData: FormData, prefix: "billing" | "shipping") {
  const line1 = optionalString(formData, `${prefix}Line1`);
  if (!line1) return undefined;
  return {
    line1,
    line2: optionalString(formData, `${prefix}Line2`),
    city: String(formData.get(`${prefix}City`) ?? "").trim(),
    state: String(formData.get(`${prefix}State`) ?? "").trim(),
    postalCode: String(formData.get(`${prefix}PostalCode`) ?? "").trim(),
    country: optionalString(formData, `${prefix}Country`) ?? "IN",
    gstStateCode: optionalString(formData, `${prefix}GstStateCode`),
  };
}

export async function convertLeadAction(id: string, formData: FormData) {
  await convertLead(id, {
    partyType: String(formData.get("partyType") ?? "COMPANY"),
    displayName: String(formData.get("displayName") ?? "").trim(),
    legalName: optionalString(formData, "legalName"),
    gstin: optionalString(formData, "gstin"),
    pan: optionalString(formData, "pan"),
    email: optionalString(formData, "email"),
    phone: optionalString(formData, "phone"),
    customerGroup: optionalString(formData, "customerGroup"),
    paymentTerms: optionalString(formData, "paymentTerms"),
    currency: optionalString(formData, "currency") ?? "INR",
    gstTreatment: optionalString(formData, "gstTreatment"),
    billingAddress: addressPayload(formData, "billing"),
    shippingAddress: addressPayload(formData, "shipping"),
    createOpportunity: formData.get("createOpportunity") === "on",
    opportunityName: optionalString(formData, "opportunityName"),
    expectedValue: numberValue(formData, "opportunityExpectedValue"),
    expectedCloseDate: optionalString(formData, "opportunityExpectedCloseDate"),
    opportunitySource: optionalString(formData, "opportunitySource"),
    notes: optionalString(formData, "notes"),
  });
  revalidatePath("/crm/leads");
  revalidatePath(`/crm/leads/${id}`);
  revalidatePath("/master-data/customers");
  redirect(`/crm/leads/${id}`);
}
