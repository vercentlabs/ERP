export const cycleCountsCreateWorkflow = {
  module: "inventory/cycle-counts",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for inventory/cycle-counts record ${recordId}`;
  },
};
