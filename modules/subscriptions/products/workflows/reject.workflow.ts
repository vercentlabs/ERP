export const productsRejectWorkflow = {
  module: "subscriptions/products",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for subscriptions/products record ${recordId}`;
  },
};
