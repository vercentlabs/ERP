export const loansAdvancesCreateWorkflow = {
  module: "payroll/loans-advances",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for payroll/loans-advances record ${recordId}`;
  },
};
