export const engineeringChangeOrdersCloseWorkflow = {
  module: "product-lifecycle/engineering-change-orders",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for product-lifecycle/engineering-change-orders record ${recordId}`;
  },
};
