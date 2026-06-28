export const customPagesCreateWorkflow = {
  module: "extension-studio/custom-pages",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for extension-studio/custom-pages record ${recordId}`;
  },
};
