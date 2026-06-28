export const supplierQualityCreateWorkflow = {
  module: "quality/supplier-quality",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for quality/supplier-quality record ${recordId}`;
  },
};
