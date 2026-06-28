export const revenueRecognitionApproveWorkflow = {
  module: "subscriptions/revenue-recognition",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for subscriptions/revenue-recognition record ${recordId}`;
  },
};
