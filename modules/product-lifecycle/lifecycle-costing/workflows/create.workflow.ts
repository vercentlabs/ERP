export const lifecycleCostingCreateWorkflow = {
  module: "product-lifecycle/lifecycle-costing",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for product-lifecycle/lifecycle-costing record ${recordId}`;
  },
};
