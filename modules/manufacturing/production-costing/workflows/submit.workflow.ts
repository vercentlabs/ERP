export const productionCostingSubmitWorkflow = {
  module: "manufacturing/production-costing",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for manufacturing/production-costing record ${recordId}`;
  },
};
