export const events = {
  created: "logistics/shipments.created",
  updated: "logistics/shipments.updated",
  submitted: "logistics/shipments.submitted",
  approved: "logistics/shipments.approved",
  rejected: "logistics/shipments.rejected",
  cancelled: "logistics/shipments.cancelled",
  closed: "logistics/shipments.closed",
  riskDetected: "logistics/shipments.risk-detected",
  nextActionRecommended: "logistics/shipments.next-action-recommended",
} as const;
