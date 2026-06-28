export const complianceDocumentsUpdateWorkflow = {
  module: "product-lifecycle/compliance-documents",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for product-lifecycle/compliance-documents record ${recordId}`;
  },
};
