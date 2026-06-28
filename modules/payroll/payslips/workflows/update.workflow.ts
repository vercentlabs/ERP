export const payslipsUpdateWorkflow = {
  module: "payroll/payslips",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for payroll/payslips record ${recordId}`;
  },
};
