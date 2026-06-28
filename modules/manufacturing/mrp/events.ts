export const events = {
  created: "manufacturing/mrp.created",
  updated: "manufacturing/mrp.updated",
  submitted: "manufacturing/mrp.submitted",
  approved: "manufacturing/mrp.approved",
  rejected: "manufacturing/mrp.rejected",
  cancelled: "manufacturing/mrp.cancelled",
  closed: "manufacturing/mrp.closed",
  riskDetected: "manufacturing/mrp.risk-detected",
  nextActionRecommended: "manufacturing/mrp.next-action-recommended",
} as const;
