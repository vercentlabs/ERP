export const events = {
  created: "master-data/locations.created",
  updated: "master-data/locations.updated",
  submitted: "master-data/locations.submitted",
  approved: "master-data/locations.approved",
  rejected: "master-data/locations.rejected",
  cancelled: "master-data/locations.cancelled",
  closed: "master-data/locations.closed",
  riskDetected: "master-data/locations.risk-detected",
  nextActionRecommended: "master-data/locations.next-action-recommended",
} as const;
