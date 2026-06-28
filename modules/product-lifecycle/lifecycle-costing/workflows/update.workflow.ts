export const lifecycleCostingUpdateWorkflow = {
  module: "product-lifecycle/lifecycle-costing",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for product-lifecycle/lifecycle-costing record ${recordId}`;
  },
};
