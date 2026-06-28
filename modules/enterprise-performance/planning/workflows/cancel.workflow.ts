export const planningCancelWorkflow = {
  module: "enterprise-performance/planning",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for enterprise-performance/planning record ${recordId}`;
  },
};
