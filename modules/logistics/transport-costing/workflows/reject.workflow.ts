export const transportCostingRejectWorkflow = {
  module: "logistics/transport-costing",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for logistics/transport-costing record ${recordId}`;
  },
};
