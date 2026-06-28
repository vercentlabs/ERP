export const customObjectsCloseWorkflow = {
  module: "extension-studio/custom-objects",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for extension-studio/custom-objects record ${recordId}`;
  },
};
