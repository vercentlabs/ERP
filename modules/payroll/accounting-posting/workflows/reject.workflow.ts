export const accountingPostingRejectWorkflow = {
  module: "payroll/accounting-posting",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for payroll/accounting-posting record ${recordId}`;
  },
};
