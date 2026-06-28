export const payrollPeriodsCreateWorkflow = {
  module: "payroll/payroll-periods",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for payroll/payroll-periods record ${recordId}`;
  },
};
