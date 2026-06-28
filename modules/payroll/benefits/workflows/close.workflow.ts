export const benefitsCloseWorkflow = {
  module: "payroll/benefits",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for payroll/benefits record ${recordId}`;
  },
};
