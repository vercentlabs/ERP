export const productsSubmitWorkflow = {
  module: "subscriptions/products",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for subscriptions/products record ${recordId}`;
  },
};
