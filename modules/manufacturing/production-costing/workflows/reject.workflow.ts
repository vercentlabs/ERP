export const productionCostingRejectWorkflow = {
  module: "manufacturing/production-costing",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for manufacturing/production-costing record ${recordId}`;
  },
};
