export const events = {
  created: "integration-marketplace/connectors.created",
  updated: "integration-marketplace/connectors.updated",
  submitted: "integration-marketplace/connectors.submitted",
  approved: "integration-marketplace/connectors.approved",
  rejected: "integration-marketplace/connectors.rejected",
  cancelled: "integration-marketplace/connectors.cancelled",
  closed: "integration-marketplace/connectors.closed",
  riskDetected: "integration-marketplace/connectors.risk-detected",
  nextActionRecommended: "integration-marketplace/connectors.next-action-recommended",
} as const;
