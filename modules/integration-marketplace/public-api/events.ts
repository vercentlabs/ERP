export const events = {
  created: "integration-marketplace/public-api.created",
  updated: "integration-marketplace/public-api.updated",
  submitted: "integration-marketplace/public-api.submitted",
  approved: "integration-marketplace/public-api.approved",
  rejected: "integration-marketplace/public-api.rejected",
  cancelled: "integration-marketplace/public-api.cancelled",
  closed: "integration-marketplace/public-api.closed",
  riskDetected: "integration-marketplace/public-api.risk-detected",
  nextActionRecommended: "integration-marketplace/public-api.next-action-recommended",
} as const;
