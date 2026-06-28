export const events = {
  created: "integration-marketplace/webhooks.created",
  updated: "integration-marketplace/webhooks.updated",
  submitted: "integration-marketplace/webhooks.submitted",
  approved: "integration-marketplace/webhooks.approved",
  rejected: "integration-marketplace/webhooks.rejected",
  cancelled: "integration-marketplace/webhooks.cancelled",
  closed: "integration-marketplace/webhooks.closed",
  riskDetected: "integration-marketplace/webhooks.risk-detected",
  nextActionRecommended: "integration-marketplace/webhooks.next-action-recommended",
} as const;
