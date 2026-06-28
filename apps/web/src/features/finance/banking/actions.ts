"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { addBankReconciliationLine, cancelBankReconciliation, completeBankReconciliation, createBankAccount, createBankReconciliation, matchBankReconciliationLine, setDefaultBankAccount, unmatchBankReconciliationLine, updateBankAccount, updateBankReconciliation } from "./api";

const value = (formData: FormData, key: string) => String(formData.get(key) ?? "").trim();
const numberValue = (formData: FormData, key: string) => Number(value(formData, key) || 0);

export async function createBankAccountAction(formData: FormData) {
  const account = await createBankAccount({ accountId: value(formData, "accountId"), accountName: value(formData, "accountName"), bankName: value(formData, "bankName") || undefined, accountType: value(formData, "accountType"), currency: value(formData, "currency") || "INR", openingBalance: numberValue(formData, "openingBalance"), status: value(formData, "status") || "ACTIVE", isDefault: formData.get("isDefault") === "on", notes: value(formData, "notes") || undefined });
  revalidatePath("/finance/bank-accounts");
  redirect(`/finance/bank-accounts/${account.id}`);
}
export async function updateBankAccountAction(id: string, formData: FormData) {
  await updateBankAccount(id, { accountName: value(formData, "accountName"), bankName: value(formData, "bankName") || undefined, accountType: value(formData, "accountType"), currency: value(formData, "currency") || "INR", openingBalance: numberValue(formData, "openingBalance"), status: value(formData, "status") || "ACTIVE", isDefault: formData.get("isDefault") === "on", notes: value(formData, "notes") || undefined });
  revalidatePath(`/finance/bank-accounts/${id}`);
  redirect(`/finance/bank-accounts/${id}`);
}
export async function setDefaultBankAccountAction(id: string) { await setDefaultBankAccount(id); revalidatePath(`/finance/bank-accounts/${id}`); }

function linesFromForm(formData: FormData) {
  const dates = formData.getAll("transactionDate").map(String);
  return dates.map((transactionDate, index) => ({ transactionDate, description: String(formData.getAll("description")[index] ?? ""), referenceNumber: String(formData.getAll("referenceNumber")[index] ?? "") || undefined, debitAmount: Number(formData.getAll("debitAmount")[index] || 0), creditAmount: Number(formData.getAll("creditAmount")[index] || 0) })).filter((line) => line.transactionDate && line.description);
}
export async function createBankReconciliationAction(formData: FormData) {
  const reconciliation = await createBankReconciliation({ bankAccountId: value(formData, "bankAccountId"), statementStartDate: value(formData, "statementStartDate"), statementEndDate: value(formData, "statementEndDate"), openingStatementBalance: numberValue(formData, "openingStatementBalance"), closingStatementBalance: numberValue(formData, "closingStatementBalance"), notes: value(formData, "notes") || undefined, lines: linesFromForm(formData) });
  revalidatePath("/finance/bank-reconciliations");
  redirect(`/finance/bank-reconciliations/${reconciliation.id}`);
}
export async function updateBankReconciliationAction(id: string, formData: FormData) {
  await updateBankReconciliation(id, { statementStartDate: value(formData, "statementStartDate"), statementEndDate: value(formData, "statementEndDate"), openingStatementBalance: numberValue(formData, "openingStatementBalance"), closingStatementBalance: numberValue(formData, "closingStatementBalance"), notes: value(formData, "notes") || undefined, lines: linesFromForm(formData) });
  revalidatePath(`/finance/bank-reconciliations/${id}`);
  redirect(`/finance/bank-reconciliations/${id}`);
}
export async function addBankReconciliationLineAction(id: string, formData: FormData) { await addBankReconciliationLine(id, { transactionDate: value(formData, "transactionDate"), description: value(formData, "description"), referenceNumber: value(formData, "referenceNumber") || undefined, debitAmount: numberValue(formData, "debitAmount"), creditAmount: numberValue(formData, "creditAmount") }); revalidatePath(`/finance/bank-reconciliations/${id}`); }
export async function matchBankReconciliationLineAction(id: string, lineId: string, formData: FormData) { await matchBankReconciliationLine(id, lineId, value(formData, "journalEntryLineId")); revalidatePath(`/finance/bank-reconciliations/${id}`); }
export async function unmatchBankReconciliationLineAction(id: string, lineId: string) { await unmatchBankReconciliationLine(id, lineId); revalidatePath(`/finance/bank-reconciliations/${id}`); }
export async function completeBankReconciliationAction(id: string) { await completeBankReconciliation(id); revalidatePath(`/finance/bank-reconciliations/${id}`); }
export async function cancelBankReconciliationAction(id: string) { await cancelBankReconciliation(id); revalidatePath(`/finance/bank-reconciliations/${id}`); }
