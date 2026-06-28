export const goodsReceiptsUpdateWorkflow = {
  module: "procurement/goods-receipts",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for procurement/goods-receipts record ${recordId}`;
  },
};
