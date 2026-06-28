export const sdkManagementCancelWorkflow = {
  module: "integration-marketplace/sdk-management",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for integration-marketplace/sdk-management record ${recordId}`;
  },
};
