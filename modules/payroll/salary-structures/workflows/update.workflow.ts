export const salaryStructuresUpdateWorkflow = {
  module: "payroll/salary-structures",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for payroll/salary-structures record ${recordId}`;
  },
};
