export const cycleCountsCloseWorkflow = {
  module: "inventory/cycle-counts",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for inventory/cycle-counts record ${recordId}`;
  },
};
