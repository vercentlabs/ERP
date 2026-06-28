export const productRevisionsRejectWorkflow = {
  module: "product-lifecycle/product-revisions",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for product-lifecycle/product-revisions record ${recordId}`;
  },
};
