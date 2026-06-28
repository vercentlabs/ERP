export const salaryStructuresRejectWorkflow = {
  module: "payroll/salary-structures",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for payroll/salary-structures record ${recordId}`;
  },
};
