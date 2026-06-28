export const oauthConnectionsRejectWorkflow = {
  module: "integration-marketplace/oauth-connections",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for integration-marketplace/oauth-connections record ${recordId}`;
  },
};
