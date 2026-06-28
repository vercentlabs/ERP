export const customFieldsCancelWorkflow = {
  module: "extension-studio/custom-fields",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for extension-studio/custom-fields record ${recordId}`;
  },
};
