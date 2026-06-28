export const supplierQualityCancelWorkflow = {
  module: "quality/supplier-quality",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for quality/supplier-quality record ${recordId}`;
  },
};
