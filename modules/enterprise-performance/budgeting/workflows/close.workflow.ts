export const budgetingCloseWorkflow = {
  module: "enterprise-performance/budgeting",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for enterprise-performance/budgeting record ${recordId}`;
  },
};
