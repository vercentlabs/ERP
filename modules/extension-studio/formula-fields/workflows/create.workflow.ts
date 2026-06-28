export const formulaFieldsCreateWorkflow = {
  module: "extension-studio/formula-fields",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for extension-studio/formula-fields record ${recordId}`;
  },
};
