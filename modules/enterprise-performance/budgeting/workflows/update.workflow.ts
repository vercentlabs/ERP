export const budgetingUpdateWorkflow = {
  module: "enterprise-performance/budgeting",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for enterprise-performance/budgeting record ${recordId}`;
  },
};
