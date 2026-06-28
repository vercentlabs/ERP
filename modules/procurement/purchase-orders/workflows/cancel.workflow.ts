export const purchaseOrdersCancelWorkflow = {
  module: "procurement/purchase-orders",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for procurement/purchase-orders record ${recordId}`;
  },
};
