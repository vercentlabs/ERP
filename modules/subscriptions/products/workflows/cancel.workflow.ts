export const productsCancelWorkflow = {
  module: "subscriptions/products",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for subscriptions/products record ${recordId}`;
  },
};
