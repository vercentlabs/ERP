export const purchaseReturnsSubmitWorkflow = {
  module: "procurement/purchase-returns",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for procurement/purchase-returns record ${recordId}`;
  },
};
