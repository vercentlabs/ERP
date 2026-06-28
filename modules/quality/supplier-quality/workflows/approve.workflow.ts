export const supplierQualityApproveWorkflow = {
  module: "quality/supplier-quality",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for quality/supplier-quality record ${recordId}`;
  },
};
