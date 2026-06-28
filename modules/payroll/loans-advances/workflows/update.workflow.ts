export const loansAdvancesUpdateWorkflow = {
  module: "payroll/loans-advances",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for payroll/loans-advances record ${recordId}`;
  },
};
