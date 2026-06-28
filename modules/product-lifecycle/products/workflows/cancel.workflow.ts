export const productsCancelWorkflow = {
  module: "product-lifecycle/products",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for product-lifecycle/products record ${recordId}`;
  },
};
