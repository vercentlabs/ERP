export const settingsCancelWorkflow = {
  module: "platform/settings",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for platform/settings record ${recordId}`;
  },
};
