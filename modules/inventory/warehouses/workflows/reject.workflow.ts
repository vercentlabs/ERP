export const warehousesRejectWorkflow = {
  module: "inventory/warehouses",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for inventory/warehouses record ${recordId}`;
  },
};
