export const safetyStockCancelWorkflow = {
  module: "inventory/safety-stock",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for inventory/safety-stock record ${recordId}`;
  },
};
