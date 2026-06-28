export const scenarioModelingRejectWorkflow = {
  module: "enterprise-performance/scenario-modeling",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for enterprise-performance/scenario-modeling record ${recordId}`;
  },
};
