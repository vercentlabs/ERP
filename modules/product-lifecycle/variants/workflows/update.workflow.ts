export const variantsUpdateWorkflow = {
  module: "product-lifecycle/variants",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for product-lifecycle/variants record ${recordId}`;
  },
};
