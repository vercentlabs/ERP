export const purchaseRequisitionsCreateWorkflow = {
  module: "procurement/purchase-requisitions",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for procurement/purchase-requisitions record ${recordId}`;
  },
};
