export const accountingPostingCloseWorkflow = {
  module: "payroll/accounting-posting",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for payroll/accounting-posting record ${recordId}`;
  },
};
