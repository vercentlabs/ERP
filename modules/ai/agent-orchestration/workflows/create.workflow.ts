export const agentOrchestrationCreateWorkflow = {
  module: "ai/agent-orchestration",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for ai/agent-orchestration record ${recordId}`;
  },
};
