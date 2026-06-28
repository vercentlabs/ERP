export const taxDeclarationsUpdateWorkflow = {
  module: "payroll/tax-declarations",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for payroll/tax-declarations record ${recordId}`;
  },
};
