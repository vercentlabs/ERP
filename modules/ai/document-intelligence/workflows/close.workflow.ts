export const documentIntelligenceCloseWorkflow = {
  module: "ai/document-intelligence",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for ai/document-intelligence record ${recordId}`;
  },
};
