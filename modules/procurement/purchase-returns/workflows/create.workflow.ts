export const purchaseReturnsCreateWorkflow = {
  module: "procurement/purchase-returns",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for procurement/purchase-returns record ${recordId}`;
  },
};
