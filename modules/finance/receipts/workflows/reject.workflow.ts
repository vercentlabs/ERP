export const receiptsRejectWorkflow = {
  module: "finance/receipts",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for finance/receipts record ${recordId}`;
  },
};
