export const productsApproveWorkflow = {
  module: "product-lifecycle/products",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for product-lifecycle/products record ${recordId}`;
  },
};
