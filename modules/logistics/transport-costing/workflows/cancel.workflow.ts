export const transportCostingCancelWorkflow = {
  module: "logistics/transport-costing",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for logistics/transport-costing record ${recordId}`;
  },
};
