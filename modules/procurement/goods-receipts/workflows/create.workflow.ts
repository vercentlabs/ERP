export const goodsReceiptsCreateWorkflow = {
  module: "procurement/goods-receipts",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for procurement/goods-receipts record ${recordId}`;
  },
};
