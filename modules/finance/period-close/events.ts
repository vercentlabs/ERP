export const events = {
  created: "finance/period-close.created",
  updated: "finance/period-close.updated",
  submitted: "finance/period-close.submitted",
  approved: "finance/period-close.approved",
  rejected: "finance/period-close.rejected",
  cancelled: "finance/period-close.cancelled",
  closed: "finance/period-close.closed",
  riskDetected: "finance/period-close.risk-detected",
  nextActionRecommended: "finance/period-close.next-action-recommended",
} as const;
