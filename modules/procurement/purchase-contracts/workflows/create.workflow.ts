export const purchaseContractsCreateWorkflow = {
  module: "procurement/purchase-contracts",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for procurement/purchase-contracts record ${recordId}`;
  },
};
