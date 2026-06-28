export const validationRulesCancelWorkflow = {
  module: "extension-studio/validation-rules",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for extension-studio/validation-rules record ${recordId}`;
  },
};
