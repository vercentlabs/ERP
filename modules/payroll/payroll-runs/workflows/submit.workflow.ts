export const payrollRunsSubmitWorkflow = {
  module: "payroll/payroll-runs",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for payroll/payroll-runs record ${recordId}`;
  },
};
