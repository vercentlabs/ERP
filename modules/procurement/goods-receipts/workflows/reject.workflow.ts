export const goodsReceiptsRejectWorkflow = {
  module: "procurement/goods-receipts",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for procurement/goods-receipts record ${recordId}`;
  },
};
