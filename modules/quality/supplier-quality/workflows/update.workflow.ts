export const supplierQualityUpdateWorkflow = {
  module: "quality/supplier-quality",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for quality/supplier-quality record ${recordId}`;
  },
};
