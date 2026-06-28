export const agentOrchestrationRejectWorkflow = {
  module: "ai/agent-orchestration",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for ai/agent-orchestration record ${recordId}`;
  },
};
