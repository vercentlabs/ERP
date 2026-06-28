export const payslipsApproveWorkflow = {
  module: "payroll/payslips",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for payroll/payslips record ${recordId}`;
  },
};
