export const safetyStockApproveWorkflow = {
  module: "inventory/safety-stock",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for inventory/safety-stock record ${recordId}`;
  },
};
