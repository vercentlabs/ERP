export const events = {
  created: "integration-marketplace/installed-apps.created",
  updated: "integration-marketplace/installed-apps.updated",
  submitted: "integration-marketplace/installed-apps.submitted",
  approved: "integration-marketplace/installed-apps.approved",
  rejected: "integration-marketplace/installed-apps.rejected",
  cancelled: "integration-marketplace/installed-apps.cancelled",
  closed: "integration-marketplace/installed-apps.closed",
  riskDetected: "integration-marketplace/installed-apps.risk-detected",
  nextActionRecommended: "integration-marketplace/installed-apps.next-action-recommended",
} as const;
