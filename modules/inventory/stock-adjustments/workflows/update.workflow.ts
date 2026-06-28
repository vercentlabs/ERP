export const stockAdjustmentsUpdateWorkflow = {
  module: "inventory/stock-adjustments",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for inventory/stock-adjustments record ${recordId}`;
  },
};
