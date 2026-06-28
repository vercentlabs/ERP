export const taxDeclarationsSubmitWorkflow = {
  module: "payroll/tax-declarations",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for payroll/tax-declarations record ${recordId}`;
  },
};
