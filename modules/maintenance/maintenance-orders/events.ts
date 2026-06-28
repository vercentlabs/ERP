export const events = {
  created: "maintenance/maintenance-orders.created",
  updated: "maintenance/maintenance-orders.updated",
  submitted: "maintenance/maintenance-orders.submitted",
  approved: "maintenance/maintenance-orders.approved",
  rejected: "maintenance/maintenance-orders.rejected",
  cancelled: "maintenance/maintenance-orders.cancelled",
  closed: "maintenance/maintenance-orders.closed",
  riskDetected: "maintenance/maintenance-orders.risk-detected",
  nextActionRecommended: "maintenance/maintenance-orders.next-action-recommended",
} as const;
