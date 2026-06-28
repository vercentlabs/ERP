export const benefitsApproveWorkflow = {
  module: "payroll/benefits",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for payroll/benefits record ${recordId}`;
  },
};
