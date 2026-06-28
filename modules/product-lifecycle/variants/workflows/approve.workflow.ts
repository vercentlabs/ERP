export const variantsApproveWorkflow = {
  module: "product-lifecycle/variants",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for product-lifecycle/variants record ${recordId}`;
  },
};
