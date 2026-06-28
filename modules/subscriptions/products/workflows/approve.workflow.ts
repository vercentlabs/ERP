export const productsApproveWorkflow = {
  module: "subscriptions/products",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for subscriptions/products record ${recordId}`;
  },
};
