export const payrollPeriodsRejectWorkflow = {
  module: "payroll/payroll-periods",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for payroll/payroll-periods record ${recordId}`;
  },
};
