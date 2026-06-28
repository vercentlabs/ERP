export const loansAdvancesCloseWorkflow = {
  module: "payroll/loans-advances",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for payroll/loans-advances record ${recordId}`;
  },
};
