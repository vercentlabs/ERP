export const variantsCloseWorkflow = {
  module: "product-lifecycle/variants",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for product-lifecycle/variants record ${recordId}`;
  },
};
