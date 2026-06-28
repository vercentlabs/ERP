export const events = {
  created: "subscriptions/plans.created",
  updated: "subscriptions/plans.updated",
  submitted: "subscriptions/plans.submitted",
  approved: "subscriptions/plans.approved",
  rejected: "subscriptions/plans.rejected",
  cancelled: "subscriptions/plans.cancelled",
  closed: "subscriptions/plans.closed",
  riskDetected: "subscriptions/plans.risk-detected",
  nextActionRecommended: "subscriptions/plans.next-action-recommended",
} as const;
