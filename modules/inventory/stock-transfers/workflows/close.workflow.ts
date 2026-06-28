export const stockTransfersCloseWorkflow = {
  module: "inventory/stock-transfers",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for inventory/stock-transfers record ${recordId}`;
  },
};
