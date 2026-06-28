export const revenueRecognitionRejectWorkflow = {
  module: "subscriptions/revenue-recognition",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for subscriptions/revenue-recognition record ${recordId}`;
  },
};
