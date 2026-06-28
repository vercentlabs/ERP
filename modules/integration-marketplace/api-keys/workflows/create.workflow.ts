export const apiKeysCreateWorkflow = {
  module: "integration-marketplace/api-keys",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for integration-marketplace/api-keys record ${recordId}`;
  },
};
