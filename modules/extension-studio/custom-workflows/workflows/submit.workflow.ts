export const customWorkflowsSubmitWorkflow = {
  module: "extension-studio/custom-workflows",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for extension-studio/custom-workflows record ${recordId}`;
  },
};
