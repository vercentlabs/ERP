export const agentOrchestrationCloseWorkflow = {
  module: "ai/agent-orchestration",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for ai/agent-orchestration record ${recordId}`;
  },
};
