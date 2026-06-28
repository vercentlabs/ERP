export const events = {
  created: "manufacturing/production-costing.created",
  updated: "manufacturing/production-costing.updated",
  submitted: "manufacturing/production-costing.submitted",
  approved: "manufacturing/production-costing.approved",
  rejected: "manufacturing/production-costing.rejected",
  cancelled: "manufacturing/production-costing.cancelled",
  closed: "manufacturing/production-costing.closed",
  riskDetected: "manufacturing/production-costing.risk-detected",
  nextActionRecommended: "manufacturing/production-costing.next-action-recommended",
} as const;
