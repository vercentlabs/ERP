export const customReportsUpdateWorkflow = {
  module: "extension-studio/custom-reports",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for extension-studio/custom-reports record ${recordId}`;
  },
};
