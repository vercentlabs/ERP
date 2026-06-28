export const loansAdvancesCancelWorkflow = {
  module: "payroll/loans-advances",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for payroll/loans-advances record ${recordId}`;
  },
};
