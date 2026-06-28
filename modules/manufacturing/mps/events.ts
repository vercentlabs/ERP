export const events = {
  created: "manufacturing/mps.created",
  updated: "manufacturing/mps.updated",
  submitted: "manufacturing/mps.submitted",
  approved: "manufacturing/mps.approved",
  rejected: "manufacturing/mps.rejected",
  cancelled: "manufacturing/mps.cancelled",
  closed: "manufacturing/mps.closed",
  riskDetected: "manufacturing/mps.risk-detected",
  nextActionRecommended: "manufacturing/mps.next-action-recommended",
} as const;
