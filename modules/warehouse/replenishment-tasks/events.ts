export const events = {
  created: "warehouse/replenishment-tasks.created",
  updated: "warehouse/replenishment-tasks.updated",
  submitted: "warehouse/replenishment-tasks.submitted",
  approved: "warehouse/replenishment-tasks.approved",
  rejected: "warehouse/replenishment-tasks.rejected",
  cancelled: "warehouse/replenishment-tasks.cancelled",
  closed: "warehouse/replenishment-tasks.closed",
  riskDetected: "warehouse/replenishment-tasks.risk-detected",
  nextActionRecommended: "warehouse/replenishment-tasks.next-action-recommended",
} as const;
