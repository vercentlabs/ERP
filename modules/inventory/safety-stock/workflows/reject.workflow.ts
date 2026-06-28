export const safetyStockRejectWorkflow = {
  module: "inventory/safety-stock",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for inventory/safety-stock record ${recordId}`;
  },
};
