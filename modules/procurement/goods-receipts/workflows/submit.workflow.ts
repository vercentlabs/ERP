export const goodsReceiptsSubmitWorkflow = {
  module: "procurement/goods-receipts",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for procurement/goods-receipts record ${recordId}`;
  },
};
