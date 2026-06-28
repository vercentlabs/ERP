"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  assignOpportunity,
  changeOpportunityStage,
  createOpportunity,
  updateOpportunity,
  type OpportunityStage,
} from "./api";

function optionalString(formData: FormData, key: string) {
  const value = String(formData.get(key) ?? "").trim();
  return value.length > 0 ? value : undefined;
}

function numberValue(formData: FormData, key: string) {
  const value = optionalString(formData, key);
  return value ? Number(value) : undefined;
}

function opportunityPayload(formData: FormData) {
  return {
    name: String(formData.get("name") ?? "").trim(),
    customerId: String(formData.get("customerId") ?? "").trim(),
    stage: optionalString(formData, "stage") ?? "PROSPECTING",
    probability: numberValue(formData, "probability"),
    expectedValue: numberValue(formData, "expectedValue") ?? 0,
    currency: optionalString(formData, "currency") ?? "INR",
    expectedCloseDate: optionalString(formData, "expectedCloseDate"),
    source: optionalString(formData, "source"),
    notes: optionalString(formData, "notes"),
    tags: optionalString(formData, "tags")?.split(",").map((tag) => tag.trim()).filter(Boolean) ?? [],
  };
}

export async function createOpportunityAction(formData: FormData) {
  const opportunity = await createOpportunity(opportunityPayload(formData));
  revalidatePath("/crm/opportunities");
  redirect(`/crm/opportunities/${opportunity.id}`);
}

export async function updateOpportunityAction(id: string, formData: FormData) {
  await updateOpportunity(id, opportunityPayload(formData));
  revalidatePath("/crm/opportunities");
  revalidatePath(`/crm/opportunities/${id}`);
  redirect(`/crm/opportunities/${id}`);
}

export async function changeOpportunityStageAction(id: string, formData: FormData) {
  await changeOpportunityStage(id, {
    stage: String(formData.get("stage")) as OpportunityStage,
    lossReason: optionalString(formData, "lossReason"),
  });
  revalidatePath("/crm/opportunities");
  revalidatePath(`/crm/opportunities/${id}`);
}

export async function assignOpportunityAction(id: string, formData: FormData) {
  await assignOpportunity(id, {
    ownerUserId: optionalString(formData, "ownerUserId"),
    assignedTeamId: optionalString(formData, "assignedTeamId"),
  });
  revalidatePath("/crm/opportunities");
  revalidatePath(`/crm/opportunities/${id}`);
}
