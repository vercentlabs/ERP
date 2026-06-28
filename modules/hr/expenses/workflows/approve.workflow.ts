export const expensesApproveWorkflow = {
  module: "hr/expenses",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for hr/expenses record ${recordId}`;
  },
};
