export const cycleCountsApproveWorkflow = {
  module: "inventory/cycle-counts",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for inventory/cycle-counts record ${recordId}`;
  },
};
