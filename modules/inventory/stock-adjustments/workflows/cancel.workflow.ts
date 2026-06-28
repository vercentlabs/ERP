export const stockAdjustmentsCancelWorkflow = {
  module: "inventory/stock-adjustments",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for inventory/stock-adjustments record ${recordId}`;
  },
};
