export const events = {
  created: "platform/workflow-approvals.created",
  updated: "platform/workflow-approvals.updated",
  submitted: "platform/workflow-approvals.submitted",
  approved: "platform/workflow-approvals.approved",
  rejected: "platform/workflow-approvals.rejected",
  cancelled: "platform/workflow-approvals.cancelled",
  closed: "platform/workflow-approvals.closed",
  riskDetected: "platform/workflow-approvals.risk-detected",
  nextActionRecommended: "platform/workflow-approvals.next-action-recommended",
} as const;
