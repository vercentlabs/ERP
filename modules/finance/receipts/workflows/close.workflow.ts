export const receiptsCloseWorkflow = {
  module: "finance/receipts",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for finance/receipts record ${recordId}`;
  },
};
