export const complianceDocumentsCloseWorkflow = {
  module: "product-lifecycle/compliance-documents",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for product-lifecycle/compliance-documents record ${recordId}`;
  },
};
