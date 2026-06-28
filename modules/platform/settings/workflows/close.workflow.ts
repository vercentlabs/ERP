export const settingsCloseWorkflow = {
  module: "platform/settings",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for platform/settings record ${recordId}`;
  },
};
