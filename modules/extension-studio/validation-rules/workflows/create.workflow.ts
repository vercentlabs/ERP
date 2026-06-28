export const validationRulesCreateWorkflow = {
  module: "extension-studio/validation-rules",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for extension-studio/validation-rules record ${recordId}`;
  },
};
