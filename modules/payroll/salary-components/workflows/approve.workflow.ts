export const salaryComponentsApproveWorkflow = {
  module: "payroll/salary-components",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for payroll/salary-components record ${recordId}`;
  },
};
