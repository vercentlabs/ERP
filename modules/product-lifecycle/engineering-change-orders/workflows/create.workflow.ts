export const engineeringChangeOrdersCreateWorkflow = {
  module: "product-lifecycle/engineering-change-orders",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for product-lifecycle/engineering-change-orders record ${recordId}`;
  },
};
