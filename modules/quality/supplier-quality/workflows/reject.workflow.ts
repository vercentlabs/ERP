export const supplierQualityRejectWorkflow = {
  module: "quality/supplier-quality",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for quality/supplier-quality record ${recordId}`;
  },
};
