export const formulaFieldsUpdateWorkflow = {
  module: "extension-studio/formula-fields",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for extension-studio/formula-fields record ${recordId}`;
  },
};
