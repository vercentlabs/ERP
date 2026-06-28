export const planningApproveWorkflow = {
  module: "enterprise-performance/planning",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for enterprise-performance/planning record ${recordId}`;
  },
};
