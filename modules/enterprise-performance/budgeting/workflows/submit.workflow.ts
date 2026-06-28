export const budgetingSubmitWorkflow = {
  module: "enterprise-performance/budgeting",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for enterprise-performance/budgeting record ${recordId}`;
  },
};
