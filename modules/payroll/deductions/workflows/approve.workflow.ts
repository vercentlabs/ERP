export const deductionsApproveWorkflow = {
  module: "payroll/deductions",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for payroll/deductions record ${recordId}`;
  },
};
