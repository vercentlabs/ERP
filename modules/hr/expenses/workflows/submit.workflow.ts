export const expensesSubmitWorkflow = {
  module: "hr/expenses",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for hr/expenses record ${recordId}`;
  },
};
