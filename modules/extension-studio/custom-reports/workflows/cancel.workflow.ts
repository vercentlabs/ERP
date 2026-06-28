export const customReportsCancelWorkflow = {
  module: "extension-studio/custom-reports",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for extension-studio/custom-reports record ${recordId}`;
  },
};
