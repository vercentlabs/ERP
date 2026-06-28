export const engineeringChangeOrdersApproveWorkflow = {
  module: "product-lifecycle/engineering-change-orders",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for product-lifecycle/engineering-change-orders record ${recordId}`;
  },
};
