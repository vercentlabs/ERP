export const purchaseContractsRejectWorkflow = {
  module: "procurement/purchase-contracts",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for procurement/purchase-contracts record ${recordId}`;
  },
};
