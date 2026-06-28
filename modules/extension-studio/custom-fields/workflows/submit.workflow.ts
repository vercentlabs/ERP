export const customFieldsSubmitWorkflow = {
  module: "extension-studio/custom-fields",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for extension-studio/custom-fields record ${recordId}`;
  },
};
