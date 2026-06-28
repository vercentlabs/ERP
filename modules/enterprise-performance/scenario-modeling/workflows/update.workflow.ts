export const scenarioModelingUpdateWorkflow = {
  module: "enterprise-performance/scenario-modeling",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for enterprise-performance/scenario-modeling record ${recordId}`;
  },
};
