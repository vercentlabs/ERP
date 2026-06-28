export const events = {
  created: "subscriptions/contracts.created",
  updated: "subscriptions/contracts.updated",
  submitted: "subscriptions/contracts.submitted",
  approved: "subscriptions/contracts.approved",
  rejected: "subscriptions/contracts.rejected",
  cancelled: "subscriptions/contracts.cancelled",
  closed: "subscriptions/contracts.closed",
  riskDetected: "subscriptions/contracts.risk-detected",
  nextActionRecommended: "subscriptions/contracts.next-action-recommended",
} as const;
