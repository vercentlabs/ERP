export const documentIntelligenceApproveWorkflow = {
  module: "ai/document-intelligence",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for ai/document-intelligence record ${recordId}`;
  },
};
