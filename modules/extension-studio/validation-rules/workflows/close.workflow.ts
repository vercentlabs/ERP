export const validationRulesCloseWorkflow = {
  module: "extension-studio/validation-rules",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for extension-studio/validation-rules record ${recordId}`;
  },
};
