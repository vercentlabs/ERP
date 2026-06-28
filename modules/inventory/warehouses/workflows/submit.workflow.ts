export const warehousesSubmitWorkflow = {
  module: "inventory/warehouses",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for inventory/warehouses record ${recordId}`;
  },
};
