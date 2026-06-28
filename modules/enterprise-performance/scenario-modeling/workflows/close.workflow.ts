export const scenarioModelingCloseWorkflow = {
  module: "enterprise-performance/scenario-modeling",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for enterprise-performance/scenario-modeling record ${recordId}`;
  },
};
