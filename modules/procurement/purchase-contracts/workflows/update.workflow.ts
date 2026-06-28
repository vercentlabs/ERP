export const purchaseContractsUpdateWorkflow = {
  module: "procurement/purchase-contracts",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for procurement/purchase-contracts record ${recordId}`;
  },
};
