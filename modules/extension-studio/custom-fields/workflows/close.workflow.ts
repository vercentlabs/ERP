export const customFieldsCloseWorkflow = {
  module: "extension-studio/custom-fields",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for extension-studio/custom-fields record ${recordId}`;
  },
};
