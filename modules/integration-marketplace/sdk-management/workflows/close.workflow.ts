export const sdkManagementCloseWorkflow = {
  module: "integration-marketplace/sdk-management",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for integration-marketplace/sdk-management record ${recordId}`;
  },
};
