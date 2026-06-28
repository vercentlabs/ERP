export const budgetingRejectWorkflow = {
  module: "enterprise-performance/budgeting",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for enterprise-performance/budgeting record ${recordId}`;
  },
};
