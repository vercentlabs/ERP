export const productionCostingUpdateWorkflow = {
  module: "manufacturing/production-costing",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for manufacturing/production-costing record ${recordId}`;
  },
};
