export const budgetingCancelWorkflow = {
  module: "enterprise-performance/budgeting",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for enterprise-performance/budgeting record ${recordId}`;
  },
};
