export const salaryComponentsRejectWorkflow = {
  module: "payroll/salary-components",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for payroll/salary-components record ${recordId}`;
  },
};
