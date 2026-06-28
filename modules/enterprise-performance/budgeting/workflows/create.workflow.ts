export const budgetingCreateWorkflow = {
  module: "enterprise-performance/budgeting",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for enterprise-performance/budgeting record ${recordId}`;
  },
};
