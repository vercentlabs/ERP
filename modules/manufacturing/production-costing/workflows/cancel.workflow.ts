export const productionCostingCancelWorkflow = {
  module: "manufacturing/production-costing",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for manufacturing/production-costing record ${recordId}`;
  },
};
