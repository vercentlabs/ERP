export const stockTransfersUpdateWorkflow = {
  module: "inventory/stock-transfers",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for inventory/stock-transfers record ${recordId}`;
  },
};
