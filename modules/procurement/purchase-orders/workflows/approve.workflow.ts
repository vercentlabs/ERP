export const purchaseOrdersApproveWorkflow = {
  module: "procurement/purchase-orders",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for procurement/purchase-orders record ${recordId}`;
  },
};
