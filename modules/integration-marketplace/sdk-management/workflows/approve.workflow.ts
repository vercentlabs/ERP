export const sdkManagementApproveWorkflow = {
  module: "integration-marketplace/sdk-management",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for integration-marketplace/sdk-management record ${recordId}`;
  },
};
