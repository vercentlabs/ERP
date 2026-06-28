export const installedAppsApproveWorkflow = {
  module: "integration-marketplace/installed-apps",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for integration-marketplace/installed-apps record ${recordId}`;
  },
};
