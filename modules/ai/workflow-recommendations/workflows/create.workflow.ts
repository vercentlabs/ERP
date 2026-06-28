export const workflowRecommendationsCreateWorkflow = {
  module: "ai/workflow-recommendations",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for ai/workflow-recommendations record ${recordId}`;
  },
};
