export const revenueRecognitionCreateWorkflow = {
  module: "subscriptions/revenue-recognition",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for subscriptions/revenue-recognition record ${recordId}`;
  },
};
