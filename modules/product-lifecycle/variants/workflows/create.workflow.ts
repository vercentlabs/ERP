export const variantsCreateWorkflow = {
  module: "product-lifecycle/variants",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for product-lifecycle/variants record ${recordId}`;
  },
};
