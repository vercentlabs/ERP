export const events = {
  created: "logistics/shipment-tracking.created",
  updated: "logistics/shipment-tracking.updated",
  submitted: "logistics/shipment-tracking.submitted",
  approved: "logistics/shipment-tracking.approved",
  rejected: "logistics/shipment-tracking.rejected",
  cancelled: "logistics/shipment-tracking.cancelled",
  closed: "logistics/shipment-tracking.closed",
  riskDetected: "logistics/shipment-tracking.risk-detected",
  nextActionRecommended: "logistics/shipment-tracking.next-action-recommended",
} as const;
