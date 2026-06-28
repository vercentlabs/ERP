export const budgetsCreateWorkflow = {
  module: "finance/budgets",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for finance/budgets record ${recordId}`;
  },
};
