export const customerQualityApproveWorkflow = {
  module: "quality/customer-quality",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for quality/customer-quality record ${recordId}`;
  },
};
