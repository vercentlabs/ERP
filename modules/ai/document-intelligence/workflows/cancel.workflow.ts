export const documentIntelligenceCancelWorkflow = {
  module: "ai/document-intelligence",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for ai/document-intelligence record ${recordId}`;
  },
};
