export const payrollPeriodsApproveWorkflow = {
  module: "payroll/payroll-periods",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for payroll/payroll-periods record ${recordId}`;
  },
};
