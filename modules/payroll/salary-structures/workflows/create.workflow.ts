export const salaryStructuresCreateWorkflow = {
  module: "payroll/salary-structures",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for payroll/salary-structures record ${recordId}`;
  },
};
