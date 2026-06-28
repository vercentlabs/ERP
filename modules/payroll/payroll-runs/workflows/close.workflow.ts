export const payrollRunsCloseWorkflow = {
  module: "payroll/payroll-runs",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for payroll/payroll-runs record ${recordId}`;
  },
};
