export const productsCreateWorkflow = {
  module: "subscriptions/products",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for subscriptions/products record ${recordId}`;
  },
};
