export const installedAppsRejectWorkflow = {
  module: "integration-marketplace/installed-apps",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for integration-marketplace/installed-apps record ${recordId}`;
  },
};
