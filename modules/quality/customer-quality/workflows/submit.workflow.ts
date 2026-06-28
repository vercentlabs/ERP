export const customerQualitySubmitWorkflow = {
  module: "quality/customer-quality",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for quality/customer-quality record ${recordId}`;
  },
};
