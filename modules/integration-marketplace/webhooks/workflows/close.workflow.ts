export const webhooksCloseWorkflow = {
  module: "integration-marketplace/webhooks",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for integration-marketplace/webhooks record ${recordId}`;
  },
};
