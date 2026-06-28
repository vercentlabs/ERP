export const cycleCountsSubmitWorkflow = {
  module: "inventory/cycle-counts",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for inventory/cycle-counts record ${recordId}`;
  },
};
