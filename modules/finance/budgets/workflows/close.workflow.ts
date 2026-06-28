export const budgetsCloseWorkflow = {
  module: "finance/budgets",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for finance/budgets record ${recordId}`;
  },
};
