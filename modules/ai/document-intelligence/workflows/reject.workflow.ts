export const documentIntelligenceRejectWorkflow = {
  module: "ai/document-intelligence",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for ai/document-intelligence record ${recordId}`;
  },
};
