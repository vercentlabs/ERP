export const purchaseOrdersRejectWorkflow = {
  module: "procurement/purchase-orders",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for procurement/purchase-orders record ${recordId}`;
  },
};
