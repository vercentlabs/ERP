export const stockTransfersApproveWorkflow = {
  module: "inventory/stock-transfers",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for inventory/stock-transfers record ${recordId}`;
  },
};
