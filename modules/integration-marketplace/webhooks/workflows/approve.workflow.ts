export const webhooksApproveWorkflow = {
  module: "integration-marketplace/webhooks",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for integration-marketplace/webhooks record ${recordId}`;
  },
};
