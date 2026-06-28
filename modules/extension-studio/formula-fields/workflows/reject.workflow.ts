export const formulaFieldsRejectWorkflow = {
  module: "extension-studio/formula-fields",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for extension-studio/formula-fields record ${recordId}`;
  },
};
