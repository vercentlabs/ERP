export const permissions = {
  bankAccountsView: "finance.bank_accounts.view",
  bankAccountsCreate: "finance.bank_accounts.create",
  bankAccountsUpdate: "finance.bank_accounts.update",
  bankAccountsDelete: "finance.bank_accounts.delete",
  cashBankLedgerView: "finance.cash_bank_ledger.view",
  reconciliationView: "finance.bank_reconciliation.view",
  reconciliationCreate: "finance.bank_reconciliation.create",
  reconciliationUpdate: "finance.bank_reconciliation.update",
  reconciliationDelete: "finance.bank_reconciliation.delete",
  reconciliationMatch: "finance.bank_reconciliation.match",
  reconciliationComplete: "finance.bank_reconciliation.complete",
  reconciliationCancel: "finance.bank_reconciliation.cancel",
} as const;
