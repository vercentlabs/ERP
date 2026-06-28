export const documentIntelligenceCreateWorkflow = {
  module: "ai/document-intelligence",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for ai/document-intelligence record ${recordId}`;
  },
};
