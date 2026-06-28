export const events = {
  created: "subscriptions/renewals.created",
  updated: "subscriptions/renewals.updated",
  submitted: "subscriptions/renewals.submitted",
  approved: "subscriptions/renewals.approved",
  rejected: "subscriptions/renewals.rejected",
  cancelled: "subscriptions/renewals.cancelled",
  closed: "subscriptions/renewals.closed",
  riskDetected: "subscriptions/renewals.risk-detected",
  nextActionRecommended: "subscriptions/renewals.next-action-recommended",
} as const;
