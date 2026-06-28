export const warehousesCreateWorkflow = {
  module: "inventory/warehouses",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for inventory/warehouses record ${recordId}`;
  },
};
