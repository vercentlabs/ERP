export const deductionsUpdateWorkflow = {
  module: "payroll/deductions",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for payroll/deductions record ${recordId}`;
  },
};
