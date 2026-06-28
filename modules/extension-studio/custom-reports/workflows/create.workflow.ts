export const customReportsCreateWorkflow = {
  module: "extension-studio/custom-reports",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for extension-studio/custom-reports record ${recordId}`;
  },
};
