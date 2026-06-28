export const accountingPostingSubmitWorkflow = {
  module: "payroll/accounting-posting",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for payroll/accounting-posting record ${recordId}`;
  },
};
