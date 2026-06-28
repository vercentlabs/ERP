export const formulaFieldsApproveWorkflow = {
  module: "extension-studio/formula-fields",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for extension-studio/formula-fields record ${recordId}`;
  },
};
