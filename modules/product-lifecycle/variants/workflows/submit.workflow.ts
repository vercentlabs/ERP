export const variantsSubmitWorkflow = {
  module: "product-lifecycle/variants",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for product-lifecycle/variants record ${recordId}`;
  },
};
