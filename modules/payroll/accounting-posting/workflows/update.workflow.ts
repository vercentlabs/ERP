export const accountingPostingUpdateWorkflow = {
  module: "payroll/accounting-posting",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for payroll/accounting-posting record ${recordId}`;
  },
};
