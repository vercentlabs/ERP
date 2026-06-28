export const scriptingUpdateWorkflow = {
  module: "extension-studio/scripting",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for extension-studio/scripting record ${recordId}`;
  },
};
