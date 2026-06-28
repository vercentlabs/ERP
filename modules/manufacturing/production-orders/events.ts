export const events = {
  created: "manufacturing/production-orders.created",
  updated: "manufacturing/production-orders.updated",
  submitted: "manufacturing/production-orders.submitted",
  approved: "manufacturing/production-orders.approved",
  rejected: "manufacturing/production-orders.rejected",
  cancelled: "manufacturing/production-orders.cancelled",
  closed: "manufacturing/production-orders.closed",
  riskDetected: "manufacturing/production-orders.risk-detected",
  nextActionRecommended: "manufacturing/production-orders.next-action-recommended",
} as const;
