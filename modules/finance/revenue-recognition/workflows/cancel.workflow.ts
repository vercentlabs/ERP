export const revenueRecognitionCancelWorkflow = {
  module: "finance/revenue-recognition",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for finance/revenue-recognition record ${recordId}`;
  },
};
