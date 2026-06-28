export const workflowRecommendationsUpdateWorkflow = {
  module: "ai/workflow-recommendations",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for ai/workflow-recommendations record ${recordId}`;
  },
};
