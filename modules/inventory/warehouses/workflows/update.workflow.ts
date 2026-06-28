export const warehousesUpdateWorkflow = {
  module: "inventory/warehouses",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for inventory/warehouses record ${recordId}`;
  },
};
