export const stockAdjustmentsCloseWorkflow = {
  module: "inventory/stock-adjustments",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for inventory/stock-adjustments record ${recordId}`;
  },
};
