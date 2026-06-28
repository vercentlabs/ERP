export const events = {
  created: "warehouse/shipping.created",
  updated: "warehouse/shipping.updated",
  submitted: "warehouse/shipping.submitted",
  approved: "warehouse/shipping.approved",
  rejected: "warehouse/shipping.rejected",
  cancelled: "warehouse/shipping.cancelled",
  closed: "warehouse/shipping.closed",
  riskDetected: "warehouse/shipping.risk-detected",
  nextActionRecommended: "warehouse/shipping.next-action-recommended",
} as const;
