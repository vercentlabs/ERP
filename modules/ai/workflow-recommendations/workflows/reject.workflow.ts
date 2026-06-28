export const workflowRecommendationsRejectWorkflow = {
  module: "ai/workflow-recommendations",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for ai/workflow-recommendations record ${recordId}`;
  },
};
