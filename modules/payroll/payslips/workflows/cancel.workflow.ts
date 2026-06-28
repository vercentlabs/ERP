export const payslipsCancelWorkflow = {
  module: "payroll/payslips",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for payroll/payslips record ${recordId}`;
  },
};
