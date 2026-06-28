export const customObjectsCreateWorkflow = {
  module: "extension-studio/custom-objects",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for extension-studio/custom-objects record ${recordId}`;
  },
};
