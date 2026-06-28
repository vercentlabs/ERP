export const events = {
  created: "inventory/demand-planning.created",
  updated: "inventory/demand-planning.updated",
  submitted: "inventory/demand-planning.submitted",
  approved: "inventory/demand-planning.approved",
  rejected: "inventory/demand-planning.rejected",
  cancelled: "inventory/demand-planning.cancelled",
  closed: "inventory/demand-planning.closed",
  riskDetected: "inventory/demand-planning.risk-detected",
  nextActionRecommended: "inventory/demand-planning.next-action-recommended",
} as const;
