export const payrollRunsCancelWorkflow = {
  module: "payroll/payroll-runs",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for payroll/payroll-runs record ${recordId}`;
  },
};
