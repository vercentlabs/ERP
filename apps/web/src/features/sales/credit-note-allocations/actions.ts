"use server";

import { revalidatePath } from "next/cache";
import { allocateSalesCreditNote } from "./api";

const value = (formData: FormData, key: string) => String(formData.get(key) ?? "").trim();
export async function allocateSalesCreditNoteAction(creditNoteId: string, formData: FormData) {
  await allocateSalesCreditNote(creditNoteId, {
    targetType: value(formData, "targetType"),
    targetId: value(formData, "targetId"),
    allocationDate: value(formData, "allocationDate") || undefined,
    amount: Number(value(formData, "amount") || 0),
    notes: value(formData, "notes") || undefined,
  });
  revalidatePath(`/sales/credit-notes/${creditNoteId}`);
}
