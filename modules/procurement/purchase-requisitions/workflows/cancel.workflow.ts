export const purchaseRequisitionsCancelWorkflow = {
  module: "procurement/purchase-requisitions",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for procurement/purchase-requisitions record ${recordId}`;
  },
};
