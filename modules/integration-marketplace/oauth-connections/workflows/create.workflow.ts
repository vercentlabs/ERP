export const oauthConnectionsCreateWorkflow = {
  module: "integration-marketplace/oauth-connections",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for integration-marketplace/oauth-connections record ${recordId}`;
  },
};
