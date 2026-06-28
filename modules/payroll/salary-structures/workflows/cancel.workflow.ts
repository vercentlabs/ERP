export const salaryStructuresCancelWorkflow = {
  module: "payroll/salary-structures",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for payroll/salary-structures record ${recordId}`;
  },
};
