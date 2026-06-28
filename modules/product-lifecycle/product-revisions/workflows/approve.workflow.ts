export const productRevisionsApproveWorkflow = {
  module: "product-lifecycle/product-revisions",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for product-lifecycle/product-revisions record ${recordId}`;
  },
};
