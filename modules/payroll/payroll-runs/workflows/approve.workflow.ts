export const payrollRunsApproveWorkflow = {
  module: "payroll/payroll-runs",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for payroll/payroll-runs record ${recordId}`;
  },
};
