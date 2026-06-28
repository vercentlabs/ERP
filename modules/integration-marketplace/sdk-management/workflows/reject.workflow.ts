export const sdkManagementRejectWorkflow = {
  module: "integration-marketplace/sdk-management",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for integration-marketplace/sdk-management record ${recordId}`;
  },
};
