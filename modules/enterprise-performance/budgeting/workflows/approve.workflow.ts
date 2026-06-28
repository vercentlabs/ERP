export const budgetingApproveWorkflow = {
  module: "enterprise-performance/budgeting",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for enterprise-performance/budgeting record ${recordId}`;
  },
};
