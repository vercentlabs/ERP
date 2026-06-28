export const taxDeclarationsCloseWorkflow = {
  module: "payroll/tax-declarations",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for payroll/tax-declarations record ${recordId}`;
  },
};
