export const payrollRunsUpdateWorkflow = {
  module: "payroll/payroll-runs",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for payroll/payroll-runs record ${recordId}`;
  },
};
