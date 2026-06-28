export const purchaseOrdersSubmitWorkflow = {
  module: "procurement/purchase-orders",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for procurement/purchase-orders record ${recordId}`;
  },
};
