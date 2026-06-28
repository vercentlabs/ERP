export const transportCostingCreateWorkflow = {
  module: "logistics/transport-costing",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for logistics/transport-costing record ${recordId}`;
  },
};
