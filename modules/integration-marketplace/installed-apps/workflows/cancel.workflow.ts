export const installedAppsCancelWorkflow = {
  module: "integration-marketplace/installed-apps",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for integration-marketplace/installed-apps record ${recordId}`;
  },
};
