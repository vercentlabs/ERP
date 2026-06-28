export const scenarioModelingCancelWorkflow = {
  module: "enterprise-performance/scenario-modeling",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for enterprise-performance/scenario-modeling record ${recordId}`;
  },
};
