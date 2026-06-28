export const scriptingCancelWorkflow = {
  module: "extension-studio/scripting",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for extension-studio/scripting record ${recordId}`;
  },
};
