export const salaryComponentsCloseWorkflow = {
  module: "payroll/salary-components",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for payroll/salary-components record ${recordId}`;
  },
};
