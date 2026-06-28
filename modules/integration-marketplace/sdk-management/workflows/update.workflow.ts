export const sdkManagementUpdateWorkflow = {
  module: "integration-marketplace/sdk-management",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for integration-marketplace/sdk-management record ${recordId}`;
  },
};
