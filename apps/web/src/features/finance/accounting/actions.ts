"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { closeFiscalYear, createAccount, createFiscalYear, createJournalEntry, postJournalEntry, setDefaultFiscalYear, updateAccount, updateJournalEntry, cancelJournalEntry, updateAccountingSettings } from "./api";

const value = (formData: FormData, key: string) => String(formData.get(key) ?? "").trim();
const numberValue = (formData: FormData, key: string) => Number(value(formData, key) || 0);

export async function createAccountAction(formData: FormData) {
  const account = await createAccount({ accountCode: value(formData, "accountCode"), accountName: value(formData, "accountName"), accountType: value(formData, "accountType"), normalBalance: value(formData, "normalBalance"), openingBalance: numberValue(formData, "openingBalance"), isActive: formData.get("isActive") === "on" });
  revalidatePath("/finance/accounts");
  redirect(`/finance/accounts/${account.id}`);
}
export async function updateAccountAction(id: string, formData: FormData) {
  await updateAccount(id, { accountName: value(formData, "accountName"), accountType: value(formData, "accountType"), normalBalance: value(formData, "normalBalance"), openingBalance: numberValue(formData, "openingBalance"), isActive: formData.get("isActive") === "on" });
  revalidatePath(`/finance/accounts/${id}`);
  redirect(`/finance/accounts/${id}`);
}
export async function createFiscalYearAction(formData: FormData) {
  await createFiscalYear({ name: value(formData, "name"), startDate: value(formData, "startDate"), endDate: value(formData, "endDate"), isDefault: formData.get("isDefault") === "on" });
  revalidatePath("/finance/fiscal-years");
}
export async function setDefaultFiscalYearAction(id: string) { await setDefaultFiscalYear(id); revalidatePath("/finance/fiscal-years"); }
export async function closeFiscalYearAction(id: string) { await closeFiscalYear(id); revalidatePath("/finance/fiscal-years"); }

function linesFromForm(formData: FormData) {
  const accountIds = formData.getAll("accountId").map(String);
  return accountIds.map((accountId, index) => ({ accountId, debitAmount: Number(formData.getAll("debitAmount")[index] || 0), creditAmount: Number(formData.getAll("creditAmount")[index] || 0), narration: String(formData.getAll("lineNarration")[index] ?? "") })).filter((line) => line.accountId);
}
export async function createJournalEntryAction(formData: FormData) {
  const journal = await createJournalEntry({ fiscalYearId: value(formData, "fiscalYearId"), journalDate: value(formData, "journalDate"), narration: value(formData, "narration"), lines: linesFromForm(formData) });
  revalidatePath("/finance/journal-entries");
  redirect(`/finance/journal-entries/${journal.id}`);
}
export async function updateJournalEntryAction(id: string, formData: FormData) {
  await updateJournalEntry(id, { fiscalYearId: value(formData, "fiscalYearId"), journalDate: value(formData, "journalDate"), narration: value(formData, "narration"), lines: linesFromForm(formData) });
  revalidatePath(`/finance/journal-entries/${id}`);
  redirect(`/finance/journal-entries/${id}`);
}
export async function postJournalEntryAction(id: string) { await postJournalEntry(id); revalidatePath(`/finance/journal-entries/${id}`); }
export async function cancelJournalEntryAction(id: string) { await cancelJournalEntry(id); revalidatePath(`/finance/journal-entries/${id}`); }
export async function updateAccountingSettingsAction(formData: FormData) {
  await updateAccountingSettings({
    accountsReceivableAccountId: value(formData, "accountsReceivableAccountId"),
    salesIncomeAccountId: value(formData, "salesIncomeAccountId"),
    salesReturnsAccountId: value(formData, "salesReturnsAccountId") || undefined,
    additionalChargesIncomeAccountId: value(formData, "additionalChargesIncomeAccountId") || undefined,
    salesTaxPayableAccountId: value(formData, "salesTaxPayableAccountId") || undefined,
    roundingAdjustmentAccountId: value(formData, "roundingAdjustmentAccountId") || undefined,
  });
  revalidatePath("/finance/accounting/settings");
}
