export const goodsReceiptsApproveWorkflow = {
  module: "procurement/goods-receipts",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for procurement/goods-receipts record ${recordId}`;
  },
};
