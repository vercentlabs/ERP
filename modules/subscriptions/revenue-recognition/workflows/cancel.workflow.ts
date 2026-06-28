export const revenueRecognitionCancelWorkflow = {
  module: "subscriptions/revenue-recognition",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for subscriptions/revenue-recognition record ${recordId}`;
  },
};
