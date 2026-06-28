export const budgetsSubmitWorkflow = {
  module: "finance/budgets",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for finance/budgets record ${recordId}`;
  },
};
