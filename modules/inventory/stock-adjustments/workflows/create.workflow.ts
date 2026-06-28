export const stockAdjustmentsCreateWorkflow = {
  module: "inventory/stock-adjustments",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for inventory/stock-adjustments record ${recordId}`;
  },
};
