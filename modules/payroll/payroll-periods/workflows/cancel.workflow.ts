export const payrollPeriodsCancelWorkflow = {
  module: "payroll/payroll-periods",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for payroll/payroll-periods record ${recordId}`;
  },
};
