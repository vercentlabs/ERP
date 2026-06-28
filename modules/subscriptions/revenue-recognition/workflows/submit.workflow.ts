export const revenueRecognitionSubmitWorkflow = {
  module: "subscriptions/revenue-recognition",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for subscriptions/revenue-recognition record ${recordId}`;
  },
};
