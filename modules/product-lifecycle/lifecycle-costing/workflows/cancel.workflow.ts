export const lifecycleCostingCancelWorkflow = {
  module: "product-lifecycle/lifecycle-costing",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for product-lifecycle/lifecycle-costing record ${recordId}`;
  },
};
