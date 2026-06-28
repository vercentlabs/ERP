export const lifecycleCostingCloseWorkflow = {
  module: "product-lifecycle/lifecycle-costing",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for product-lifecycle/lifecycle-costing record ${recordId}`;
  },
};
