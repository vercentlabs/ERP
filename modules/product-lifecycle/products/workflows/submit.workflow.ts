export const productsSubmitWorkflow = {
  module: "product-lifecycle/products",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for product-lifecycle/products record ${recordId}`;
  },
};
