export const payslipsSubmitWorkflow = {
  module: "payroll/payslips",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for payroll/payslips record ${recordId}`;
  },
};
