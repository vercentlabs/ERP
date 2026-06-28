export const oauthConnectionsUpdateWorkflow = {
  module: "integration-marketplace/oauth-connections",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for integration-marketplace/oauth-connections record ${recordId}`;
  },
};
