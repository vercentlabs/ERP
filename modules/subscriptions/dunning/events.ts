export const events = {
  created: "subscriptions/dunning.created",
  updated: "subscriptions/dunning.updated",
  submitted: "subscriptions/dunning.submitted",
  approved: "subscriptions/dunning.approved",
  rejected: "subscriptions/dunning.rejected",
  cancelled: "subscriptions/dunning.cancelled",
  closed: "subscriptions/dunning.closed",
  riskDetected: "subscriptions/dunning.risk-detected",
  nextActionRecommended: "subscriptions/dunning.next-action-recommended",
} as const;
