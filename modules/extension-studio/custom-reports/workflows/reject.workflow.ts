export const customReportsRejectWorkflow = {
  module: "extension-studio/custom-reports",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for extension-studio/custom-reports record ${recordId}`;
  },
};
