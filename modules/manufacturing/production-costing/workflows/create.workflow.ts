export const productionCostingCreateWorkflow = {
  module: "manufacturing/production-costing",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for manufacturing/production-costing record ${recordId}`;
  },
};
