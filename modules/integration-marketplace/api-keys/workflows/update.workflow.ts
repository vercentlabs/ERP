export const apiKeysUpdateWorkflow = {
  module: "integration-marketplace/api-keys",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for integration-marketplace/api-keys record ${recordId}`;
  },
};
