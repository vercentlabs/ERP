export const customFieldsCreateWorkflow = {
  module: "extension-studio/custom-fields",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for extension-studio/custom-fields record ${recordId}`;
  },
};
