export const warehousesCloseWorkflow = {
  module: "inventory/warehouses",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for inventory/warehouses record ${recordId}`;
  },
};
