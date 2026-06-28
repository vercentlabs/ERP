export const formulaFieldsCloseWorkflow = {
  module: "extension-studio/formula-fields",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for extension-studio/formula-fields record ${recordId}`;
  },
};
