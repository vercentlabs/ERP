export const purchaseContractsSubmitWorkflow = {
  module: "procurement/purchase-contracts",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for procurement/purchase-contracts record ${recordId}`;
  },
};
