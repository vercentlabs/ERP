export const events = {
  created: "finance/deferred-revenue.created",
  updated: "finance/deferred-revenue.updated",
  submitted: "finance/deferred-revenue.submitted",
  approved: "finance/deferred-revenue.approved",
  rejected: "finance/deferred-revenue.rejected",
  cancelled: "finance/deferred-revenue.cancelled",
  closed: "finance/deferred-revenue.closed",
  riskDetected: "finance/deferred-revenue.risk-detected",
  nextActionRecommended: "finance/deferred-revenue.next-action-recommended",
} as const;
