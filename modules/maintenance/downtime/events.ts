export const events = {
  created: "maintenance/downtime.created",
  updated: "maintenance/downtime.updated",
  submitted: "maintenance/downtime.submitted",
  approved: "maintenance/downtime.approved",
  rejected: "maintenance/downtime.rejected",
  cancelled: "maintenance/downtime.cancelled",
  closed: "maintenance/downtime.closed",
  riskDetected: "maintenance/downtime.risk-detected",
  nextActionRecommended: "maintenance/downtime.next-action-recommended",
} as const;
