export const customPagesUpdateWorkflow = {
  module: "extension-studio/custom-pages",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for extension-studio/custom-pages record ${recordId}`;
  },
};
