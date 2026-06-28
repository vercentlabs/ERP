export const validationRulesSubmitWorkflow = {
  module: "extension-studio/validation-rules",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for extension-studio/validation-rules record ${recordId}`;
  },
};
