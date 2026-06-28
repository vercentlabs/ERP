export const events = {
  created: "product-lifecycle/engineering-change-orders.created",
  updated: "product-lifecycle/engineering-change-orders.updated",
  submitted: "product-lifecycle/engineering-change-orders.submitted",
  approved: "product-lifecycle/engineering-change-orders.approved",
  rejected: "product-lifecycle/engineering-change-orders.rejected",
  cancelled: "product-lifecycle/engineering-change-orders.cancelled",
  closed: "product-lifecycle/engineering-change-orders.closed",
  riskDetected: "product-lifecycle/engineering-change-orders.risk-detected",
  nextActionRecommended: "product-lifecycle/engineering-change-orders.next-action-recommended",
} as const;
