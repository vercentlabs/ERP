export const purchaseOrdersCreateWorkflow = {
  module: "procurement/purchase-orders",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for procurement/purchase-orders record ${recordId}`;
  },
};
