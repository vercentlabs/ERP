export const revenueRecognitionApproveWorkflow = {
  module: "finance/revenue-recognition",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for finance/revenue-recognition record ${recordId}`;
  },
};
