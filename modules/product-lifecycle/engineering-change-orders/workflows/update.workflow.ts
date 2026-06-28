export const engineeringChangeOrdersUpdateWorkflow = {
  module: "product-lifecycle/engineering-change-orders",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for product-lifecycle/engineering-change-orders record ${recordId}`;
  },
};
