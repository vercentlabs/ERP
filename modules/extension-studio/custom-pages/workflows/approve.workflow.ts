export const customPagesApproveWorkflow = {
  module: "extension-studio/custom-pages",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for extension-studio/custom-pages record ${recordId}`;
  },
};
