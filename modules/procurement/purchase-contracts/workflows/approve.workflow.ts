export const purchaseContractsApproveWorkflow = {
  module: "procurement/purchase-contracts",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for procurement/purchase-contracts record ${recordId}`;
  },
};
