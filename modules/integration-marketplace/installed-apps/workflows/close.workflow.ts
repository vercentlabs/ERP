export const installedAppsCloseWorkflow = {
  module: "integration-marketplace/installed-apps",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for integration-marketplace/installed-apps record ${recordId}`;
  },
};
