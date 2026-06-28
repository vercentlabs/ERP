export const events = {
  created: "finance/budgets.created",
  updated: "finance/budgets.updated",
  submitted: "finance/budgets.submitted",
  approved: "finance/budgets.approved",
  rejected: "finance/budgets.rejected",
  cancelled: "finance/budgets.cancelled",
  closed: "finance/budgets.closed",
  riskDetected: "finance/budgets.risk-detected",
  nextActionRecommended: "finance/budgets.next-action-recommended",
} as const;
