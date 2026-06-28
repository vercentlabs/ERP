export const events = {
  created: "product-lifecycle/product-revisions.created",
  updated: "product-lifecycle/product-revisions.updated",
  submitted: "product-lifecycle/product-revisions.submitted",
  approved: "product-lifecycle/product-revisions.approved",
  rejected: "product-lifecycle/product-revisions.rejected",
  cancelled: "product-lifecycle/product-revisions.cancelled",
  closed: "product-lifecycle/product-revisions.closed",
  riskDetected: "product-lifecycle/product-revisions.risk-detected",
  nextActionRecommended: "product-lifecycle/product-revisions.next-action-recommended",
} as const;
