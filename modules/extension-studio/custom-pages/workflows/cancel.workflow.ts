export const customPagesCancelWorkflow = {
  module: "extension-studio/custom-pages",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for extension-studio/custom-pages record ${recordId}`;
  },
};
