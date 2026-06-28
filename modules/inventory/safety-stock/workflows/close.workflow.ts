export const safetyStockCloseWorkflow = {
  module: "inventory/safety-stock",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for inventory/safety-stock record ${recordId}`;
  },
};
