export const validationRulesUpdateWorkflow = {
  module: "extension-studio/validation-rules",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for extension-studio/validation-rules record ${recordId}`;
  },
};
