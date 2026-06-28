export const scriptingApproveWorkflow = {
  module: "extension-studio/scripting",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for extension-studio/scripting record ${recordId}`;
  },
};
