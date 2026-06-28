export const lifecycleCostingApproveWorkflow = {
  module: "product-lifecycle/lifecycle-costing",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for product-lifecycle/lifecycle-costing record ${recordId}`;
  },
};
