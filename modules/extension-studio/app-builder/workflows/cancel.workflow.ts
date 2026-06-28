export const appBuilderCancelWorkflow = {
  module: "extension-studio/app-builder",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for extension-studio/app-builder record ${recordId}`;
  },
};
