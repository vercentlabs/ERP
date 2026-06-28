export const events = {
  created: "ai/agent-orchestration.created",
  updated: "ai/agent-orchestration.updated",
  submitted: "ai/agent-orchestration.submitted",
  approved: "ai/agent-orchestration.approved",
  rejected: "ai/agent-orchestration.rejected",
  cancelled: "ai/agent-orchestration.cancelled",
  closed: "ai/agent-orchestration.closed",
  riskDetected: "ai/agent-orchestration.risk-detected",
  nextActionRecommended: "ai/agent-orchestration.next-action-recommended",
} as const;
