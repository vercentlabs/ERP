export const events = {
  created: "procurement/blanket-orders.created",
  updated: "procurement/blanket-orders.updated",
  submitted: "procurement/blanket-orders.submitted",
  approved: "procurement/blanket-orders.approved",
  rejected: "procurement/blanket-orders.rejected",
  cancelled: "procurement/blanket-orders.cancelled",
  closed: "procurement/blanket-orders.closed",
  riskDetected: "procurement/blanket-orders.risk-detected",
  nextActionRecommended: "procurement/blanket-orders.next-action-recommended",
} as const;
