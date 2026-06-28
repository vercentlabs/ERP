export const customObjectsUpdateWorkflow = {
  module: "extension-studio/custom-objects",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for extension-studio/custom-objects record ${recordId}`;
  },
};
