export const installedAppsUpdateWorkflow = {
  module: "integration-marketplace/installed-apps",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for integration-marketplace/installed-apps record ${recordId}`;
  },
};
