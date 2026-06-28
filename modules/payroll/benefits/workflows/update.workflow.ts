export const benefitsUpdateWorkflow = {
  module: "payroll/benefits",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for payroll/benefits record ${recordId}`;
  },
};
