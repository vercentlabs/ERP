export const variantsCancelWorkflow = {
  module: "product-lifecycle/variants",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for product-lifecycle/variants record ${recordId}`;
  },
};
