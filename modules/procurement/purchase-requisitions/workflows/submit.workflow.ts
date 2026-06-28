export const purchaseRequisitionsSubmitWorkflow = {
  module: "procurement/purchase-requisitions",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for procurement/purchase-requisitions record ${recordId}`;
  },
};
