export const events = {
  created: "ai/workflow-recommendations.created",
  updated: "ai/workflow-recommendations.updated",
  submitted: "ai/workflow-recommendations.submitted",
  approved: "ai/workflow-recommendations.approved",
  rejected: "ai/workflow-recommendations.rejected",
  cancelled: "ai/workflow-recommendations.cancelled",
  closed: "ai/workflow-recommendations.closed",
  riskDetected: "ai/workflow-recommendations.risk-detected",
  nextActionRecommended: "ai/workflow-recommendations.next-action-recommended",
} as const;
