export const supplierQualityCloseWorkflow = {
  module: "quality/supplier-quality",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for quality/supplier-quality record ${recordId}`;
  },
};
