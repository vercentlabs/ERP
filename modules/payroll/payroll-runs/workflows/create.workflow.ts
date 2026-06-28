export const payrollRunsCreateWorkflow = {
  module: "payroll/payroll-runs",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for payroll/payroll-runs record ${recordId}`;
  },
};
