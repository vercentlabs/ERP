export const budgetsCancelWorkflow = {
  module: "finance/budgets",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for finance/budgets record ${recordId}`;
  },
};
