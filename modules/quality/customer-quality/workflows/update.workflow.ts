export const customerQualityUpdateWorkflow = {
  module: "quality/customer-quality",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for quality/customer-quality record ${recordId}`;
  },
};
