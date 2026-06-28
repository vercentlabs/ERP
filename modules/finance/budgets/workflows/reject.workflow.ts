export const budgetsRejectWorkflow = {
  module: "finance/budgets",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for finance/budgets record ${recordId}`;
  },
};
