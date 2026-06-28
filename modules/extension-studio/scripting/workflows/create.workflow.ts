export const scriptingCreateWorkflow = {
  module: "extension-studio/scripting",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for extension-studio/scripting record ${recordId}`;
  },
};
