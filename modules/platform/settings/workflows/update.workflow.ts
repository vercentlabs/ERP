export const settingsUpdateWorkflow = {
  module: "platform/settings",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for platform/settings record ${recordId}`;
  },
};
