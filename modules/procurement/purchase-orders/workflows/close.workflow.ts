export const purchaseOrdersCloseWorkflow = {
  module: "procurement/purchase-orders",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for procurement/purchase-orders record ${recordId}`;
  },
};
