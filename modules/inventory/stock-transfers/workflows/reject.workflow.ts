export const stockTransfersRejectWorkflow = {
  module: "inventory/stock-transfers",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for inventory/stock-transfers record ${recordId}`;
  },
};
