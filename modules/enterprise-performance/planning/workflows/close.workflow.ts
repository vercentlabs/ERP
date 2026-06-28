export const planningCloseWorkflow = {
  module: "enterprise-performance/planning",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for enterprise-performance/planning record ${recordId}`;
  },
};
