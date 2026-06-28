export const localizationCreateWorkflow = {
  module: "platform/localization",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for platform/localization record ${recordId}`;
  },
};
