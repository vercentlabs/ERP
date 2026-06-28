export const purchaseReturnsUpdateWorkflow = {
  module: "procurement/purchase-returns",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for procurement/purchase-returns record ${recordId}`;
  },
};
