export const payslipsCreateWorkflow = {
  module: "payroll/payslips",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for payroll/payslips record ${recordId}`;
  },
};
