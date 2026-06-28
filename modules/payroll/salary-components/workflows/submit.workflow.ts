export const salaryComponentsSubmitWorkflow = {
  module: "payroll/salary-components",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for payroll/salary-components record ${recordId}`;
  },
};
