export const customerQualityCloseWorkflow = {
  module: "quality/customer-quality",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for quality/customer-quality record ${recordId}`;
  },
};
