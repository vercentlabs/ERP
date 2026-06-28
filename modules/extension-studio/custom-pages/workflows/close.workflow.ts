export const customPagesCloseWorkflow = {
  module: "extension-studio/custom-pages",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for extension-studio/custom-pages record ${recordId}`;
  },
};
