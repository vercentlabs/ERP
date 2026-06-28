export const productsCreateWorkflow = {
  module: "product-lifecycle/products",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for product-lifecycle/products record ${recordId}`;
  },
};
