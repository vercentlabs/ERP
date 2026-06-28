export const workflowRecommendationsSubmitWorkflow = {
  module: "ai/workflow-recommendations",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for ai/workflow-recommendations record ${recordId}`;
  },
};
