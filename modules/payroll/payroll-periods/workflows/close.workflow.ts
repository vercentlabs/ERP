export const payrollPeriodsCloseWorkflow = {
  module: "payroll/payroll-periods",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for payroll/payroll-periods record ${recordId}`;
  },
};
