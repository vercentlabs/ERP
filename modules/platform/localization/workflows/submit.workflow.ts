export const localizationSubmitWorkflow = {
  module: "platform/localization",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for platform/localization record ${recordId}`;
  },
};
