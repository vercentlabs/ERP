export const purchaseContractsCloseWorkflow = {
  module: "procurement/purchase-contracts",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for procurement/purchase-contracts record ${recordId}`;
  },
};
