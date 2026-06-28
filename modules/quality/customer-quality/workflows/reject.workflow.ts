export const customerQualityRejectWorkflow = {
  module: "quality/customer-quality",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for quality/customer-quality record ${recordId}`;
  },
};
