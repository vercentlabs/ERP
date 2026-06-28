export const scenarioModelingCreateWorkflow = {
  module: "enterprise-performance/scenario-modeling",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for enterprise-performance/scenario-modeling record ${recordId}`;
  },
};
