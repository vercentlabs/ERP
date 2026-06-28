export const revenueRecognitionCloseWorkflow = {
  module: "finance/revenue-recognition",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for finance/revenue-recognition record ${recordId}`;
  },
};
