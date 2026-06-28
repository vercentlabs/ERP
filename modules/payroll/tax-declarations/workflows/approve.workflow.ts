export const taxDeclarationsApproveWorkflow = {
  module: "payroll/tax-declarations",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for payroll/tax-declarations record ${recordId}`;
  },
};
