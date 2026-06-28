export const loansAdvancesRejectWorkflow = {
  module: "payroll/loans-advances",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for payroll/loans-advances record ${recordId}`;
  },
};
