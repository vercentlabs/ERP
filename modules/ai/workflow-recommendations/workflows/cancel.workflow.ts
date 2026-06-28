export const workflowRecommendationsCancelWorkflow = {
  module: "ai/workflow-recommendations",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for ai/workflow-recommendations record ${recordId}`;
  },
};
