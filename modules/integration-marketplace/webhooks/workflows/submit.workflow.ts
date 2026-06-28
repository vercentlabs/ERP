export const webhooksSubmitWorkflow = {
  module: "integration-marketplace/webhooks",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for integration-marketplace/webhooks record ${recordId}`;
  },
};
