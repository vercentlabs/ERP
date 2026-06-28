export const stockTransfersSubmitWorkflow = {
  module: "inventory/stock-transfers",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for inventory/stock-transfers record ${recordId}`;
  },
};
