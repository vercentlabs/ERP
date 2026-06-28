export const events = {
  created: "commerce/commerce-orders.created",
  updated: "commerce/commerce-orders.updated",
  submitted: "commerce/commerce-orders.submitted",
  approved: "commerce/commerce-orders.approved",
  rejected: "commerce/commerce-orders.rejected",
  cancelled: "commerce/commerce-orders.cancelled",
  closed: "commerce/commerce-orders.closed",
  riskDetected: "commerce/commerce-orders.risk-detected",
  nextActionRecommended: "commerce/commerce-orders.next-action-recommended",
} as const;
