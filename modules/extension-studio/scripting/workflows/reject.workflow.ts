export const scriptingRejectWorkflow = {
  module: "extension-studio/scripting",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for extension-studio/scripting record ${recordId}`;
  },
};
