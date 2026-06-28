export const appBuilderCloseWorkflow = {
  module: "extension-studio/app-builder",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for extension-studio/app-builder record ${recordId}`;
  },
};
