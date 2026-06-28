export const events = {
  created: "subscriptions/billing-schedules.created",
  updated: "subscriptions/billing-schedules.updated",
  submitted: "subscriptions/billing-schedules.submitted",
  approved: "subscriptions/billing-schedules.approved",
  rejected: "subscriptions/billing-schedules.rejected",
  cancelled: "subscriptions/billing-schedules.cancelled",
  closed: "subscriptions/billing-schedules.closed",
  riskDetected: "subscriptions/billing-schedules.risk-detected",
  nextActionRecommended: "subscriptions/billing-schedules.next-action-recommended",
} as const;
