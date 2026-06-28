export const salaryStructuresCloseWorkflow = {
  module: "payroll/salary-structures",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for payroll/salary-structures record ${recordId}`;
  },
};
