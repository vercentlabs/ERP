export const revenueRecognitionCloseWorkflow = {
  module: "subscriptions/revenue-recognition",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for subscriptions/revenue-recognition record ${recordId}`;
  },
};
