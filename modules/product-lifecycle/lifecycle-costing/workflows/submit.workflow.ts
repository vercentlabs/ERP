export const lifecycleCostingSubmitWorkflow = {
  module: "product-lifecycle/lifecycle-costing",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for product-lifecycle/lifecycle-costing record ${recordId}`;
  },
};
