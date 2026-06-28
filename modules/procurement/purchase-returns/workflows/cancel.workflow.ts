export const purchaseReturnsCancelWorkflow = {
  module: "procurement/purchase-returns",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for procurement/purchase-returns record ${recordId}`;
  },
};
