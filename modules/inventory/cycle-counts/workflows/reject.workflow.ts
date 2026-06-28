export const cycleCountsRejectWorkflow = {
  module: "inventory/cycle-counts",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for inventory/cycle-counts record ${recordId}`;
  },
};
