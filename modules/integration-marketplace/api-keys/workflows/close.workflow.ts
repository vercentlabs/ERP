export const apiKeysCloseWorkflow = {
  module: "integration-marketplace/api-keys",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for integration-marketplace/api-keys record ${recordId}`;
  },
};
