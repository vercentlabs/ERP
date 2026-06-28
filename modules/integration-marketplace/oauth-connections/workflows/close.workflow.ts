export const oauthConnectionsCloseWorkflow = {
  module: "integration-marketplace/oauth-connections",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for integration-marketplace/oauth-connections record ${recordId}`;
  },
};
