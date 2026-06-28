export const taxDeclarationsCancelWorkflow = {
  module: "payroll/tax-declarations",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for payroll/tax-declarations record ${recordId}`;
  },
};
