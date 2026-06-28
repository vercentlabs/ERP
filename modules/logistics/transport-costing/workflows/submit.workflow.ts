export const transportCostingSubmitWorkflow = {
  module: "logistics/transport-costing",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for logistics/transport-costing record ${recordId}`;
  },
};
