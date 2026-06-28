export const oauthConnectionsSubmitWorkflow = {
  module: "integration-marketplace/oauth-connections",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for integration-marketplace/oauth-connections record ${recordId}`;
  },
};
