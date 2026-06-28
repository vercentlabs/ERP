export const safetyStockUpdateWorkflow = {
  module: "inventory/safety-stock",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for inventory/safety-stock record ${recordId}`;
  },
};
