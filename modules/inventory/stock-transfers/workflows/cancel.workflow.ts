export const stockTransfersCancelWorkflow = {
  module: "inventory/stock-transfers",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for inventory/stock-transfers record ${recordId}`;
  },
};
