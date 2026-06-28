export const events = {
  created: "warehouse/bins.created",
  updated: "warehouse/bins.updated",
  submitted: "warehouse/bins.submitted",
  approved: "warehouse/bins.approved",
  rejected: "warehouse/bins.rejected",
  cancelled: "warehouse/bins.cancelled",
  closed: "warehouse/bins.closed",
  riskDetected: "warehouse/bins.risk-detected",
  nextActionRecommended: "warehouse/bins.next-action-recommended",
} as const;
