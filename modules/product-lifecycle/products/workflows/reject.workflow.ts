export const productsRejectWorkflow = {
  module: "product-lifecycle/products",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for product-lifecycle/products record ${recordId}`;
  },
};
