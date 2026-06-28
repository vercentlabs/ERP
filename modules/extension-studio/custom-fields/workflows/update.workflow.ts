export const customFieldsUpdateWorkflow = {
  module: "extension-studio/custom-fields",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for extension-studio/custom-fields record ${recordId}`;
  },
};
