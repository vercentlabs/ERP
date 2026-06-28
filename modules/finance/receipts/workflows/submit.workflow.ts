export const receiptsSubmitWorkflow = {
  module: "finance/receipts",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for finance/receipts record ${recordId}`;
  },
};
