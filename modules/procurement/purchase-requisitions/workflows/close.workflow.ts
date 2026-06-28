export const purchaseRequisitionsCloseWorkflow = {
  module: "procurement/purchase-requisitions",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for procurement/purchase-requisitions record ${recordId}`;
  },
};
