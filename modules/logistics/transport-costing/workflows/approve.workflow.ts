export const transportCostingApproveWorkflow = {
  module: "logistics/transport-costing",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for logistics/transport-costing record ${recordId}`;
  },
};
