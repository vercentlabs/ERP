export const workflowRecommendationsCloseWorkflow = {
  module: "ai/workflow-recommendations",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for ai/workflow-recommendations record ${recordId}`;
  },
};
