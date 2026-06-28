export const complianceDocumentsCreateWorkflow = {
  module: "product-lifecycle/compliance-documents",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for product-lifecycle/compliance-documents record ${recordId}`;
  },
};
