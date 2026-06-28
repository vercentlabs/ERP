export const purchaseRequisitionsUpdateWorkflow = {
  module: "procurement/purchase-requisitions",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for procurement/purchase-requisitions record ${recordId}`;
  },
};
