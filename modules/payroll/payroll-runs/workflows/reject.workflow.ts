export const payrollRunsRejectWorkflow = {
  module: "payroll/payroll-runs",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for payroll/payroll-runs record ${recordId}`;
  },
};
