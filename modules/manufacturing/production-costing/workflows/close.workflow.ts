export const productionCostingCloseWorkflow = {
  module: "manufacturing/production-costing",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for manufacturing/production-costing record ${recordId}`;
  },
};
