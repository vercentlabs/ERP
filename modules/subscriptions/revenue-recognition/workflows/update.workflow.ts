export const revenueRecognitionUpdateWorkflow = {
  module: "subscriptions/revenue-recognition",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for subscriptions/revenue-recognition record ${recordId}`;
  },
};
