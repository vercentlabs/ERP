export const purchaseReturnsApproveWorkflow = {
  module: "procurement/purchase-returns",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for procurement/purchase-returns record ${recordId}`;
  },
};
