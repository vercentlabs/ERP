export const warehousesApproveWorkflow = {
  module: "inventory/warehouses",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for inventory/warehouses record ${recordId}`;
  },
};
