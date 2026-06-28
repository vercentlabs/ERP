export const customWorkflowsCreateWorkflow = {
  module: "extension-studio/custom-workflows",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for extension-studio/custom-workflows record ${recordId}`;
  },
};
