export const purchaseRequisitionsRejectWorkflow = {
  module: "procurement/purchase-requisitions",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for procurement/purchase-requisitions record ${recordId}`;
  },
};
