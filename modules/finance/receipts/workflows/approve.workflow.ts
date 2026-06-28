export const receiptsApproveWorkflow = {
  module: "finance/receipts",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for finance/receipts record ${recordId}`;
  },
};
