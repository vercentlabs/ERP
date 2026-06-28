export const customReportsApproveWorkflow = {
  module: "extension-studio/custom-reports",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for extension-studio/custom-reports record ${recordId}`;
  },
};
