export const webhooksUpdateWorkflow = {
  module: "integration-marketplace/webhooks",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for integration-marketplace/webhooks record ${recordId}`;
  },
};
