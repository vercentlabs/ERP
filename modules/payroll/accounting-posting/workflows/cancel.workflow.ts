export const accountingPostingCancelWorkflow = {
  module: "payroll/accounting-posting",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for payroll/accounting-posting record ${recordId}`;
  },
};
