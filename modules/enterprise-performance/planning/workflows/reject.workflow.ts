export const planningRejectWorkflow = {
  module: "enterprise-performance/planning",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for enterprise-performance/planning record ${recordId}`;
  },
};
