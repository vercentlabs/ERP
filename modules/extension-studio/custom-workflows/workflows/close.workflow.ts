export const customWorkflowsCloseWorkflow = {
  module: "extension-studio/custom-workflows",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for extension-studio/custom-workflows record ${recordId}`;
  },
};
