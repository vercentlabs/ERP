export const apiKeysRejectWorkflow = {
  module: "integration-marketplace/api-keys",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for integration-marketplace/api-keys record ${recordId}`;
  },
};
