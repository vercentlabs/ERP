export const webhooksCreateWorkflow = {
  module: "integration-marketplace/webhooks",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for integration-marketplace/webhooks record ${recordId}`;
  },
};
