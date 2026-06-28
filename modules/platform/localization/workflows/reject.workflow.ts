export const localizationRejectWorkflow = {
  module: "platform/localization",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for platform/localization record ${recordId}`;
  },
};
