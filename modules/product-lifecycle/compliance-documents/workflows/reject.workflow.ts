export const complianceDocumentsRejectWorkflow = {
  module: "product-lifecycle/compliance-documents",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for product-lifecycle/compliance-documents record ${recordId}`;
  },
};
