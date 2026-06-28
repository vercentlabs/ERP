export const loansAdvancesSubmitWorkflow = {
  module: "payroll/loans-advances",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for payroll/loans-advances record ${recordId}`;
  },
};
