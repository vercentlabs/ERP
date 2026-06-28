export const documentIntelligenceUpdateWorkflow = {
  module: "ai/document-intelligence",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for ai/document-intelligence record ${recordId}`;
  },
};
