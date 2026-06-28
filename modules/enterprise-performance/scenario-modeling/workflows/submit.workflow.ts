export const scenarioModelingSubmitWorkflow = {
  module: "enterprise-performance/scenario-modeling",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for enterprise-performance/scenario-modeling record ${recordId}`;
  },
};
