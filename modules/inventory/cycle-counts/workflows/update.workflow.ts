export const cycleCountsUpdateWorkflow = {
  module: "inventory/cycle-counts",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for inventory/cycle-counts record ${recordId}`;
  },
};
