export const loansAdvancesApproveWorkflow = {
  module: "payroll/loans-advances",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for payroll/loans-advances record ${recordId}`;
  },
};
