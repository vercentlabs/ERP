export const expensesRejectWorkflow = {
  module: "hr/expenses",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for hr/expenses record ${recordId}`;
  },
};
