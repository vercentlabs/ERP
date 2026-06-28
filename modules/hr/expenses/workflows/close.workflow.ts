export const expensesCloseWorkflow = {
  module: "hr/expenses",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for hr/expenses record ${recordId}`;
  },
};
