export const scenarioModelingApproveWorkflow = {
  module: "enterprise-performance/scenario-modeling",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for enterprise-performance/scenario-modeling record ${recordId}`;
  },
};
