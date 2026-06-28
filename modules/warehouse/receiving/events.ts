export const events = {
  created: "warehouse/receiving.created",
  updated: "warehouse/receiving.updated",
  submitted: "warehouse/receiving.submitted",
  approved: "warehouse/receiving.approved",
  rejected: "warehouse/receiving.rejected",
  cancelled: "warehouse/receiving.cancelled",
  closed: "warehouse/receiving.closed",
  riskDetected: "warehouse/receiving.risk-detected",
  nextActionRecommended: "warehouse/receiving.next-action-recommended",
} as const;
