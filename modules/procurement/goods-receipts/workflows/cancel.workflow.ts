export const goodsReceiptsCancelWorkflow = {
  module: "procurement/goods-receipts",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for procurement/goods-receipts record ${recordId}`;
  },
};
