export const expensesCancelWorkflow = {
  module: "hr/expenses",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for hr/expenses record ${recordId}`;
  },
};
