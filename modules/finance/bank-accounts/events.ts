export const events = {
  created: "finance/bank-accounts.created",
  updated: "finance/bank-accounts.updated",
  submitted: "finance/bank-accounts.submitted",
  approved: "finance/bank-accounts.approved",
  rejected: "finance/bank-accounts.rejected",
  cancelled: "finance/bank-accounts.cancelled",
  closed: "finance/bank-accounts.closed",
  riskDetected: "finance/bank-accounts.risk-detected",
  nextActionRecommended: "finance/bank-accounts.next-action-recommended",
} as const;
