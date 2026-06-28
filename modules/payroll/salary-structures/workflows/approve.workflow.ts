export const salaryStructuresApproveWorkflow = {
  module: "payroll/salary-structures",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for payroll/salary-structures record ${recordId}`;
  },
};
