export const purchaseReturnsCloseWorkflow = {
  module: "procurement/purchase-returns",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for procurement/purchase-returns record ${recordId}`;
  },
};
