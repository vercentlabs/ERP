export const webhooksRejectWorkflow = {
  module: "integration-marketplace/webhooks",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for integration-marketplace/webhooks record ${recordId}`;
  },
};
