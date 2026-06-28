export const benefitsCreateWorkflow = {
  module: "payroll/benefits",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for payroll/benefits record ${recordId}`;
  },
};
