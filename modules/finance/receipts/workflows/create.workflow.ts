export const receiptsCreateWorkflow = {
  module: "finance/receipts",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for finance/receipts record ${recordId}`;
  },
};
