export const events = {
  created: "product-lifecycle/variants.created",
  updated: "product-lifecycle/variants.updated",
  submitted: "product-lifecycle/variants.submitted",
  approved: "product-lifecycle/variants.approved",
  rejected: "product-lifecycle/variants.rejected",
  cancelled: "product-lifecycle/variants.cancelled",
  closed: "product-lifecycle/variants.closed",
  riskDetected: "product-lifecycle/variants.risk-detected",
  nextActionRecommended: "product-lifecycle/variants.next-action-recommended",
} as const;
