export const variantsRejectWorkflow = {
  module: "product-lifecycle/variants",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for product-lifecycle/variants record ${recordId}`;
  },
};
