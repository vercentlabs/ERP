export const complianceDocumentsApproveWorkflow = {
  module: "product-lifecycle/compliance-documents",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for product-lifecycle/compliance-documents record ${recordId}`;
  },
};
