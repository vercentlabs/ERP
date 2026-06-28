export const transportCostingUpdateWorkflow = {
  module: "logistics/transport-costing",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for logistics/transport-costing record ${recordId}`;
  },
};
