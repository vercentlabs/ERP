export const apiKeysCancelWorkflow = {
  module: "integration-marketplace/api-keys",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for integration-marketplace/api-keys record ${recordId}`;
  },
};
