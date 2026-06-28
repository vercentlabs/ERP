export const budgetsUpdateWorkflow = {
  module: "finance/budgets",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for finance/budgets record ${recordId}`;
  },
};
