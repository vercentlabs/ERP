export const customObjectsCancelWorkflow = {
  module: "extension-studio/custom-objects",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for extension-studio/custom-objects record ${recordId}`;
  },
};
