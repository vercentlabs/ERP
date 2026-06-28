export const oauthConnectionsCancelWorkflow = {
  module: "integration-marketplace/oauth-connections",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for integration-marketplace/oauth-connections record ${recordId}`;
  },
};
