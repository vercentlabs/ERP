export const productionCostingApproveWorkflow = {
  module: "manufacturing/production-costing",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for manufacturing/production-costing record ${recordId}`;
  },
};
