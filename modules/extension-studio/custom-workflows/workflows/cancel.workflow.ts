export const customWorkflowsCancelWorkflow = {
  module: "extension-studio/custom-workflows",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for extension-studio/custom-workflows record ${recordId}`;
  },
};
