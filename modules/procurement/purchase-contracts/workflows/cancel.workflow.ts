export const purchaseContractsCancelWorkflow = {
  module: "procurement/purchase-contracts",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for procurement/purchase-contracts record ${recordId}`;
  },
};
