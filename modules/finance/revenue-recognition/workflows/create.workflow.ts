export const revenueRecognitionCreateWorkflow = {
  module: "finance/revenue-recognition",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for finance/revenue-recognition record ${recordId}`;
  },
};
