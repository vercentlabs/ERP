export const events = {
  bankAccountCreated: "finance.bank_account.created",
  bankAccountUpdated: "finance.bank_account.updated",
  bankAccountDeleted: "finance.bank_account.deleted",
  bankAccountDefaultSet: "finance.bank_account.default_set",
  reconciliationCreated: "finance.bank_reconciliation.created",
  reconciliationUpdated: "finance.bank_reconciliation.updated",
  reconciliationDeleted: "finance.bank_reconciliation.deleted",
  reconciliationLineAdded: "finance.bank_reconciliation.line_added",
  reconciliationLineMatched: "finance.bank_reconciliation.line_matched",
  reconciliationLineUnmatched: "finance.bank_reconciliation.line_unmatched",
  reconciliationCompleted: "finance.bank_reconciliation.completed",
  reconciliationCancelled: "finance.bank_reconciliation.cancelled",
} as const;
