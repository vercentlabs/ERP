export const installedAppsCreateWorkflow = {
  module: "integration-marketplace/installed-apps",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for integration-marketplace/installed-apps record ${recordId}`;
  },
};
