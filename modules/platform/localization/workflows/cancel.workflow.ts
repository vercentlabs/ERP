export const localizationCancelWorkflow = {
  module: "platform/localization",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for platform/localization record ${recordId}`;
  },
};
