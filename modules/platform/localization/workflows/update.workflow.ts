export const localizationUpdateWorkflow = {
  module: "platform/localization",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for platform/localization record ${recordId}`;
  },
};
