export const productRevisionsUpdateWorkflow = {
  module: "product-lifecycle/product-revisions",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for product-lifecycle/product-revisions record ${recordId}`;
  },
};
