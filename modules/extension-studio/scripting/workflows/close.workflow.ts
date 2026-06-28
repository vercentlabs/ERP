export const scriptingCloseWorkflow = {
  module: "extension-studio/scripting",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for extension-studio/scripting record ${recordId}`;
  },
};
