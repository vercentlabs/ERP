export const productsUpdateWorkflow = {
  module: "subscriptions/products",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for subscriptions/products record ${recordId}`;
  },
};
