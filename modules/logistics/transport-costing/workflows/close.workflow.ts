export const transportCostingCloseWorkflow = {
  module: "logistics/transport-costing",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for logistics/transport-costing record ${recordId}`;
  },
};
