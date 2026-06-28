export const revenueRecognitionSubmitWorkflow = {
  module: "finance/revenue-recognition",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for finance/revenue-recognition record ${recordId}`;
  },
};
