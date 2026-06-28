export const accountingPostingCreateWorkflow = {
  module: "payroll/accounting-posting",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for payroll/accounting-posting record ${recordId}`;
  },
};
