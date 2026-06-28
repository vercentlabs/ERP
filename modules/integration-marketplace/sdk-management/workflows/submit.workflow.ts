export const sdkManagementSubmitWorkflow = {
  module: "integration-marketplace/sdk-management",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for integration-marketplace/sdk-management record ${recordId}`;
  },
};
