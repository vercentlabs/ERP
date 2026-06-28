export const formulaFieldsSubmitWorkflow = {
  module: "extension-studio/formula-fields",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for extension-studio/formula-fields record ${recordId}`;
  },
};
