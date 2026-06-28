export const events = {
  created: "procurement/purchase-orders.created",
  updated: "procurement/purchase-orders.updated",
  submitted: "procurement/purchase-orders.submitted",
  approved: "procurement/purchase-orders.approved",
  rejected: "procurement/purchase-orders.rejected",
  cancelled: "procurement/purchase-orders.cancelled",
  closed: "procurement/purchase-orders.closed",
  riskDetected: "procurement/purchase-orders.risk-detected",
  nextActionRecommended: "procurement/purchase-orders.next-action-recommended",
} as const;
