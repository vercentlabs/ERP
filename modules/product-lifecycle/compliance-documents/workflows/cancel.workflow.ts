export const complianceDocumentsCancelWorkflow = {
  module: "product-lifecycle/compliance-documents",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for product-lifecycle/compliance-documents record ${recordId}`;
  },
};
