export const events = {
  created: "subscriptions/metered-usage.created",
  updated: "subscriptions/metered-usage.updated",
  submitted: "subscriptions/metered-usage.submitted",
  approved: "subscriptions/metered-usage.approved",
  rejected: "subscriptions/metered-usage.rejected",
  cancelled: "subscriptions/metered-usage.cancelled",
  closed: "subscriptions/metered-usage.closed",
  riskDetected: "subscriptions/metered-usage.risk-detected",
  nextActionRecommended: "subscriptions/metered-usage.next-action-recommended",
} as const;
