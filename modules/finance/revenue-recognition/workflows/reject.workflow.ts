export const revenueRecognitionRejectWorkflow = {
  module: "finance/revenue-recognition",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for finance/revenue-recognition record ${recordId}`;
  },
};
