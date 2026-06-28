export const sdkManagementCreateWorkflow = {
  module: "integration-marketplace/sdk-management",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for integration-marketplace/sdk-management record ${recordId}`;
  },
};
