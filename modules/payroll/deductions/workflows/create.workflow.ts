export const deductionsCreateWorkflow = {
  module: "payroll/deductions",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for payroll/deductions record ${recordId}`;
  },
};
