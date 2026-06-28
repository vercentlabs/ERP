export const supplierQualitySubmitWorkflow = {
  module: "quality/supplier-quality",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for quality/supplier-quality record ${recordId}`;
  },
};
