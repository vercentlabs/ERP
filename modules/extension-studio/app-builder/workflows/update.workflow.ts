export const appBuilderUpdateWorkflow = {
  module: "extension-studio/app-builder",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for extension-studio/app-builder record ${recordId}`;
  },
};
