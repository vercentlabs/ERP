export const workflowRecommendationsApproveWorkflow = {
  module: "ai/workflow-recommendations",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for ai/workflow-recommendations record ${recordId}`;
  },
};
