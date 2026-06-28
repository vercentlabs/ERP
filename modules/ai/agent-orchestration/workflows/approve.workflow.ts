export const agentOrchestrationApproveWorkflow = {
  module: "ai/agent-orchestration",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for ai/agent-orchestration record ${recordId}`;
  },
};
