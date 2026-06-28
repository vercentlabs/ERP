export const purchaseRequisitionsApproveWorkflow = {
  module: "procurement/purchase-requisitions",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for procurement/purchase-requisitions record ${recordId}`;
  },
};
