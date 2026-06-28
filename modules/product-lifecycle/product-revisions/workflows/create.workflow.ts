export const productRevisionsCreateWorkflow = {
  module: "product-lifecycle/product-revisions",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for product-lifecycle/product-revisions record ${recordId}`;
  },
};
