export const engineeringChangeOrdersCancelWorkflow = {
  module: "product-lifecycle/engineering-change-orders",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for product-lifecycle/engineering-change-orders record ${recordId}`;
  },
};
