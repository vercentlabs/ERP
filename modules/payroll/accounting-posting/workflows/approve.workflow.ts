export const accountingPostingApproveWorkflow = {
  module: "payroll/accounting-posting",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for payroll/accounting-posting record ${recordId}`;
  },
};
