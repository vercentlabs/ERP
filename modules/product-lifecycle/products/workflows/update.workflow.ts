export const productsUpdateWorkflow = {
  module: "product-lifecycle/products",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for product-lifecycle/products record ${recordId}`;
  },
};
