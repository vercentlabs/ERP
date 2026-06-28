export const events = {
  created: "inventory/locations.created",
  updated: "inventory/locations.updated",
  submitted: "inventory/locations.submitted",
  approved: "inventory/locations.approved",
  rejected: "inventory/locations.rejected",
  cancelled: "inventory/locations.cancelled",
  closed: "inventory/locations.closed",
  riskDetected: "inventory/locations.risk-detected",
  nextActionRecommended: "inventory/locations.next-action-recommended",
} as const;
