export const expensesCreateWorkflow = {
  module: "hr/expenses",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for hr/expenses record ${recordId}`;
  },
};
