export const events = {
  created: "finance/currencies.created",
  updated: "finance/currencies.updated",
  submitted: "finance/currencies.submitted",
  approved: "finance/currencies.approved",
  rejected: "finance/currencies.rejected",
  cancelled: "finance/currencies.cancelled",
  closed: "finance/currencies.closed",
  riskDetected: "finance/currencies.risk-detected",
  nextActionRecommended: "finance/currencies.next-action-recommended",
} as const;
