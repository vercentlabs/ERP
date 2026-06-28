export const oauthConnectionsApproveWorkflow = {
  module: "integration-marketplace/oauth-connections",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for integration-marketplace/oauth-connections record ${recordId}`;
  },
};
