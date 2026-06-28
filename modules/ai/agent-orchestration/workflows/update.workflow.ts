export const agentOrchestrationUpdateWorkflow = {
  module: "ai/agent-orchestration",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for ai/agent-orchestration record ${recordId}`;
  },
};
