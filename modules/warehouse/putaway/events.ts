export const events = {
  created: "warehouse/putaway.created",
  updated: "warehouse/putaway.updated",
  submitted: "warehouse/putaway.submitted",
  approved: "warehouse/putaway.approved",
  rejected: "warehouse/putaway.rejected",
  cancelled: "warehouse/putaway.cancelled",
  closed: "warehouse/putaway.closed",
  riskDetected: "warehouse/putaway.risk-detected",
  nextActionRecommended: "warehouse/putaway.next-action-recommended",
} as const;
