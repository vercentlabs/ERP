export const customReportsCloseWorkflow = {
  module: "extension-studio/custom-reports",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for extension-studio/custom-reports record ${recordId}`;
  },
};
