export const cycleCountsCancelWorkflow = {
  module: "inventory/cycle-counts",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for inventory/cycle-counts record ${recordId}`;
  },
};
