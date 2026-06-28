export const taxDeclarationsCreateWorkflow = {
  module: "payroll/tax-declarations",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for payroll/tax-declarations record ${recordId}`;
  },
};
