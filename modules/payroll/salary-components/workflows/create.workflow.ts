export const salaryComponentsCreateWorkflow = {
  module: "payroll/salary-components",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for payroll/salary-components record ${recordId}`;
  },
};
