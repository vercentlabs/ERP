export const revenueRecognitionUpdateWorkflow = {
  module: "finance/revenue-recognition",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for finance/revenue-recognition record ${recordId}`;
  },
};
