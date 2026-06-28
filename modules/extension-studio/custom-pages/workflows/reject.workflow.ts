export const customPagesRejectWorkflow = {
  module: "extension-studio/custom-pages",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for extension-studio/custom-pages record ${recordId}`;
  },
};
