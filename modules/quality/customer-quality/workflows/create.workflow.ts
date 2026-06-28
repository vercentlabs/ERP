export const customerQualityCreateWorkflow = {
  module: "quality/customer-quality",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for quality/customer-quality record ${recordId}`;
  },
};
