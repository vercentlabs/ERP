export const scriptingSubmitWorkflow = {
  module: "extension-studio/scripting",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for extension-studio/scripting record ${recordId}`;
  },
};
