export const appBuilderApproveWorkflow = {
  module: "extension-studio/app-builder",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for extension-studio/app-builder record ${recordId}`;
  },
};
