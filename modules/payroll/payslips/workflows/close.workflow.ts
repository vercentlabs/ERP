export const payslipsCloseWorkflow = {
  module: "payroll/payslips",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for payroll/payslips record ${recordId}`;
  },
};
