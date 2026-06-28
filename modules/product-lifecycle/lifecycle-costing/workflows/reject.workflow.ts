export const lifecycleCostingRejectWorkflow = {
  module: "product-lifecycle/lifecycle-costing",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for product-lifecycle/lifecycle-costing record ${recordId}`;
  },
};
