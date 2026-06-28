export const events = {
  created: "product-lifecycle/products.created",
  updated: "product-lifecycle/products.updated",
  submitted: "product-lifecycle/products.submitted",
  approved: "product-lifecycle/products.approved",
  rejected: "product-lifecycle/products.rejected",
  cancelled: "product-lifecycle/products.cancelled",
  closed: "product-lifecycle/products.closed",
  riskDetected: "product-lifecycle/products.risk-detected",
  nextActionRecommended: "product-lifecycle/products.next-action-recommended",
} as const;
