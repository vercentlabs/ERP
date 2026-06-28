export const warehousesCancelWorkflow = {
  module: "inventory/warehouses",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for inventory/warehouses record ${recordId}`;
  },
};
