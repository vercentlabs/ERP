export const events = {
  created: "integration-marketplace/oauth-connections.created",
  updated: "integration-marketplace/oauth-connections.updated",
  submitted: "integration-marketplace/oauth-connections.submitted",
  approved: "integration-marketplace/oauth-connections.approved",
  rejected: "integration-marketplace/oauth-connections.rejected",
  cancelled: "integration-marketplace/oauth-connections.cancelled",
  closed: "integration-marketplace/oauth-connections.closed",
  riskDetected: "integration-marketplace/oauth-connections.risk-detected",
  nextActionRecommended: "integration-marketplace/oauth-connections.next-action-recommended",
} as const;
