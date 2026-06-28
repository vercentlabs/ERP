export const receiptsCancelWorkflow = {
  module: "finance/receipts",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for finance/receipts record ${recordId}`;
  },
};
