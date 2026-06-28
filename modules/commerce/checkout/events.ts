export const events = {
  created: "commerce/checkout.created",
  updated: "commerce/checkout.updated",
  submitted: "commerce/checkout.submitted",
  approved: "commerce/checkout.approved",
  rejected: "commerce/checkout.rejected",
  cancelled: "commerce/checkout.cancelled",
  closed: "commerce/checkout.closed",
  riskDetected: "commerce/checkout.risk-detected",
  nextActionRecommended: "commerce/checkout.next-action-recommended",
} as const;
