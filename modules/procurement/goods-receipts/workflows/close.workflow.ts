export const goodsReceiptsCloseWorkflow = {
  module: "procurement/goods-receipts",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for procurement/goods-receipts record ${recordId}`;
  },
};
