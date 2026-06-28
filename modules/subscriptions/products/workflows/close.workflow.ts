export const productsCloseWorkflow = {
  module: "subscriptions/products",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for subscriptions/products record ${recordId}`;
  },
};
