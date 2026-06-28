export const benefitsRejectWorkflow = {
  module: "payroll/benefits",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for payroll/benefits record ${recordId}`;
  },
};
