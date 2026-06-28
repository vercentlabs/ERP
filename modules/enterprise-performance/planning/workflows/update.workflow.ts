export const planningUpdateWorkflow = {
  module: "enterprise-performance/planning",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for enterprise-performance/planning record ${recordId}`;
  },
};
