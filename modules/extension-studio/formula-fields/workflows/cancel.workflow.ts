export const formulaFieldsCancelWorkflow = {
  module: "extension-studio/formula-fields",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for extension-studio/formula-fields record ${recordId}`;
  },
};
