export const stockTransfersCreateWorkflow = {
  module: "inventory/stock-transfers",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for inventory/stock-transfers record ${recordId}`;
  },
};
