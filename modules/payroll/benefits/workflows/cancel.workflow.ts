export const benefitsCancelWorkflow = {
  module: "payroll/benefits",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for payroll/benefits record ${recordId}`;
  },
};
