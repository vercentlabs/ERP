export const events = {
  created: "subscriptions/products.created",
  updated: "subscriptions/products.updated",
  submitted: "subscriptions/products.submitted",
  approved: "subscriptions/products.approved",
  rejected: "subscriptions/products.rejected",
  cancelled: "subscriptions/products.cancelled",
  closed: "subscriptions/products.closed",
  riskDetected: "subscriptions/products.risk-detected",
  nextActionRecommended: "subscriptions/products.next-action-recommended",
} as const;
