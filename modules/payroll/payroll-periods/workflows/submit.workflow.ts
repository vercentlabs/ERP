export const payrollPeriodsSubmitWorkflow = {
  module: "payroll/payroll-periods",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for payroll/payroll-periods record ${recordId}`;
  },
};
