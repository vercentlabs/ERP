export const productRevisionsCloseWorkflow = {
  module: "product-lifecycle/product-revisions",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for product-lifecycle/product-revisions record ${recordId}`;
  },
};
