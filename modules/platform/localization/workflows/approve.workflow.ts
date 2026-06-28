export const localizationApproveWorkflow = {
  module: "platform/localization",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for platform/localization record ${recordId}`;
  },
};
