export const taxDeclarationsRejectWorkflow = {
  module: "payroll/tax-declarations",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for payroll/tax-declarations record ${recordId}`;
  },
};
