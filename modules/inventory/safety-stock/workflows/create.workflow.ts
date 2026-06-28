export const safetyStockCreateWorkflow = {
  module: "inventory/safety-stock",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for inventory/safety-stock record ${recordId}`;
  },
};
