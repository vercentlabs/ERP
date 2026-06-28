export const payrollPeriodsUpdateWorkflow = {
  module: "payroll/payroll-periods",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for payroll/payroll-periods record ${recordId}`;
  },
};
