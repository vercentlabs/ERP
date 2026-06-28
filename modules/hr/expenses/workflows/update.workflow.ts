export const expensesUpdateWorkflow = {
  module: "hr/expenses",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for hr/expenses record ${recordId}`;
  },
};
