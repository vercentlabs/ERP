export const productsCloseWorkflow = {
  module: "product-lifecycle/products",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for product-lifecycle/products record ${recordId}`;
  },
};
