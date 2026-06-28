export const webhooksCancelWorkflow = {
  module: "integration-marketplace/webhooks",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for integration-marketplace/webhooks record ${recordId}`;
  },
};
