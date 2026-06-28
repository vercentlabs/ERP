export const salaryComponentsCancelWorkflow = {
  module: "payroll/salary-components",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for payroll/salary-components record ${recordId}`;
  },
};
