export const events = {
  created: "finance/bank-reconciliation.created",
  updated: "finance/bank-reconciliation.updated",
  submitted: "finance/bank-reconciliation.submitted",
  approved: "finance/bank-reconciliation.approved",
  rejected: "finance/bank-reconciliation.rejected",
  cancelled: "finance/bank-reconciliation.cancelled",
  closed: "finance/bank-reconciliation.closed",
  riskDetected: "finance/bank-reconciliation.risk-detected",
  nextActionRecommended: "finance/bank-reconciliation.next-action-recommended",
} as const;
