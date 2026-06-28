export const appBuilderRejectWorkflow = {
  module: "extension-studio/app-builder",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for extension-studio/app-builder record ${recordId}`;
  },
};
