export const benefitsSubmitWorkflow = {
  module: "payroll/benefits",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for payroll/benefits record ${recordId}`;
  },
};
