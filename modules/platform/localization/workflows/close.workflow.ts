export const localizationCloseWorkflow = {
  module: "platform/localization",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for platform/localization record ${recordId}`;
  },
};
