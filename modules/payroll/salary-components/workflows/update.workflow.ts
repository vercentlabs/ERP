export const salaryComponentsUpdateWorkflow = {
  module: "payroll/salary-components",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for payroll/salary-components record ${recordId}`;
  },
};
