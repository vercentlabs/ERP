export const documentIntelligenceSubmitWorkflow = {
  module: "ai/document-intelligence",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for ai/document-intelligence record ${recordId}`;
  },
};
