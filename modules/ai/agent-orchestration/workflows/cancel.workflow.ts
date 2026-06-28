export const agentOrchestrationCancelWorkflow = {
  module: "ai/agent-orchestration",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for ai/agent-orchestration record ${recordId}`;
  },
};
