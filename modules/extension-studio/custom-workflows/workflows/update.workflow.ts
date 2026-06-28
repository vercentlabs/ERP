export const customWorkflowsUpdateWorkflow = {
  module: "extension-studio/custom-workflows",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for extension-studio/custom-workflows record ${recordId}`;
  },
};
