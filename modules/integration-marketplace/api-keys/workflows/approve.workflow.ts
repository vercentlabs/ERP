export const apiKeysApproveWorkflow = {
  module: "integration-marketplace/api-keys",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for integration-marketplace/api-keys record ${recordId}`;
  },
};
