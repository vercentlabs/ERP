export const purchaseOrdersUpdateWorkflow = {
  module: "procurement/purchase-orders",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for procurement/purchase-orders record ${recordId}`;
  },
};
