export const appBuilderCreateWorkflow = {
  module: "extension-studio/app-builder",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for extension-studio/app-builder record ${recordId}`;
  },
};
