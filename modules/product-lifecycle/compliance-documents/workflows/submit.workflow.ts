export const complianceDocumentsSubmitWorkflow = {
  module: "product-lifecycle/compliance-documents",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for product-lifecycle/compliance-documents record ${recordId}`;
  },
};
