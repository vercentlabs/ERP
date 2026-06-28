export const events = {
  created: "logistics/delivery-runs.created",
  updated: "logistics/delivery-runs.updated",
  submitted: "logistics/delivery-runs.submitted",
  approved: "logistics/delivery-runs.approved",
  rejected: "logistics/delivery-runs.rejected",
  cancelled: "logistics/delivery-runs.cancelled",
  closed: "logistics/delivery-runs.closed",
  riskDetected: "logistics/delivery-runs.risk-detected",
  nextActionRecommended: "logistics/delivery-runs.next-action-recommended",
} as const;
