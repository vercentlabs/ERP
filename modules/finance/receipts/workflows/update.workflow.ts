export const receiptsUpdateWorkflow = {
  module: "finance/receipts",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for finance/receipts record ${recordId}`;
  },
};
