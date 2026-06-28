export const validationRulesApproveWorkflow = {
  module: "extension-studio/validation-rules",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for extension-studio/validation-rules record ${recordId}`;
  },
};
