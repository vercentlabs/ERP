export const events = {
  created: "manufacturing/routings.created",
  updated: "manufacturing/routings.updated",
  submitted: "manufacturing/routings.submitted",
  approved: "manufacturing/routings.approved",
  rejected: "manufacturing/routings.rejected",
  cancelled: "manufacturing/routings.cancelled",
  closed: "manufacturing/routings.closed",
  riskDetected: "manufacturing/routings.risk-detected",
  nextActionRecommended: "manufacturing/routings.next-action-recommended",
} as const;
