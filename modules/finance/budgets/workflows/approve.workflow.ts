export const budgetsApproveWorkflow = {
  module: "finance/budgets",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for finance/budgets record ${recordId}`;
  },
};
