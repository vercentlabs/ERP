export const installedAppsSubmitWorkflow = {
  module: "integration-marketplace/installed-apps",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for integration-marketplace/installed-apps record ${recordId}`;
  },
};
