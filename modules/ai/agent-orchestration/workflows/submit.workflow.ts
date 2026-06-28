export const agentOrchestrationSubmitWorkflow = {
  module: "ai/agent-orchestration",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for ai/agent-orchestration record ${recordId}`;
  },
};
