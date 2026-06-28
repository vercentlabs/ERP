export const planningCreateWorkflow = {
  module: "enterprise-performance/planning",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for enterprise-performance/planning record ${recordId}`;
  },
};
