export const purchaseReturnsRejectWorkflow = {
  module: "procurement/purchase-returns",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for procurement/purchase-returns record ${recordId}`;
  },
};
