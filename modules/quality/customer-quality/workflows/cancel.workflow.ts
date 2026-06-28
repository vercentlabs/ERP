export const customerQualityCancelWorkflow = {
  module: "quality/customer-quality",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for quality/customer-quality record ${recordId}`;
  },
};
