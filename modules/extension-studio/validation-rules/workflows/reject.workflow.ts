export const validationRulesRejectWorkflow = {
  module: "extension-studio/validation-rules",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for extension-studio/validation-rules record ${recordId}`;
  },
};
