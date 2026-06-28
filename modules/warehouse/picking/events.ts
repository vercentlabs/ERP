export const events = {
  created: "warehouse/picking.created",
  updated: "warehouse/picking.updated",
  submitted: "warehouse/picking.submitted",
  approved: "warehouse/picking.approved",
  rejected: "warehouse/picking.rejected",
  cancelled: "warehouse/picking.cancelled",
  closed: "warehouse/picking.closed",
  riskDetected: "warehouse/picking.risk-detected",
  nextActionRecommended: "warehouse/picking.next-action-recommended",
} as const;
