export const salaryStructuresSubmitWorkflow = {
  module: "payroll/salary-structures",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for payroll/salary-structures record ${recordId}`;
  },
};
